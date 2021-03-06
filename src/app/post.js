/*
 * When first created a Post object is just a holder for Post attributes
 * with some convenience methods for updating attributes, validating, etc.
 *
 * EXAMPLE:
 *
 *     var Post = require('app/post')
 *
 *     var post = new Post({ title: 'Some title' })
 *
 *     if (post.validation().isValid()) { Post.persist(post) }
 *
 * Instead of using callbacks or promises, the Post function is observable:
 *
 *     Post.on('posts:did:persist', function(post) {
 *       console.log('post ' + post + ' was successfully created')
 *     })
 *
 */

var _ = {
  defaults : require('lodash/object/defaults'),
  merge    : require('lodash/object/merge'),
  pick     : require('lodash/object/pick'),
  reject   : require('lodash/collection/reject')
}

var
  fbref = new Firebase('https://musifavs.firebaseio.com'),
  timeago = require('../lib/fromnow'),
  yt = require('../lib/youtube')

function Post(opts, key) {
  this.setattr(_.defaults({}, opts, {key: key}, Post.defaults))
}

Post.defaults = {
  date: undefined,
  desc: '',
  embed: {},
  favers: {},
  key: null,
  stored: false,
  title: '',
  uid: undefined,
  userName: undefined
}

/*
 *******************************************************************************
 * Instance Methods
 *******************************************************************************
 */

Post.prototype.equals = function(other) {
  return this.key === other.key
}

Post.prototype.toString = function() {
  return JSON.stringify(_.pick(this.getattr(), ['title', 'key']))
}

// Returns only Post *data* attributes
Post.prototype.getattr = function() {
  return _.pick(this, Object.keys(Post.defaults))
}

// Sets attributes and derived/computed attributes
Post.prototype.setattr = function(opts) {
  _.merge(this, opts)

  var p = this

  this.stored = (!!p.key) && (p.key != 'new')
  this.date = p.date ? new Date(p.date) : new Date()

  if (p.embed && (!p.embed.type || p.embed.type == 'unknown')) {
    // TODO: parse other services (soundcloud, bandcamp, etc.)
    this.embed = yt.extractEmbed(p.embed.url)
  }

  return this
}

// returns an object with validation results
Post.prototype.validation = function() {
  var p = this, r = { errors: [], isValid: true }

  if (!p.date instanceof Date) {
    r.errors.date = 'date is invalid'
    r.isValid = false
  }

  if (!p.title || p.title.length === 0) {
    r.errors.title = 'title can\'t be blank'
    r.isValid = false
  }

  if (!p.embed || !p.embed.type || p.embed.type == 'unknown') {
    r.errors.url = 'the embed url is invalid'
    r.isValid = false
  }

  return r
}

// Returns a String formatted date.
Post.prototype.timeago = function() {
  return timeago(this.date)
}

Post.prototype.favoritedBy = function(uid) {
  return !!this.favers[uid]
}

// Firebase root of all user posts
Post.prototype.fbrootref = function() {
  return fbref.child('user_posts/' + this.uid)
}

// Firebase root of the specific user post
Post.prototype.fbpostref = function(postfix) {
  return this.fbrootref().child('/' + this.key + (postfix ? '/' + postfix : ''))
}

/*
 *******************************************************************************
 * "Static" Methods
 *******************************************************************************
 */

// Extend the Post Function (not the instances) with pub/sub properties.
require('riot').observable(Post)

Post.destroy = function(post) {
  post.fbpostref().remove(function(error){
    if (!error) {
      post.destroyed = true
      Post.trigger('store:posts:did:destroy', post)
    }
  })
}


var listeners = {}

// When called, store:posts:did:retrieve events will be triggered
// after firebase child_added events.
Post.retrieve = function retrieve(collection) {
  if (listeners[collection]) { return }

  var ref = fbref.child(collection).orderByPriority()

  listeners[collection] = ref.on('child_added', function(snapshot) {
    var post = new Post(snapshot.val(), snapshot.key())
    Post.trigger('store:posts:did:retrieve', collection, post)
  })
}

Post.stopRetrieve = function(collection) {
  if (!listeners[collection]) { return }

  fbref.off('child_added', listeners[collection])
  delete listeners[collection]
}

/*
 * Returns latest 10 items from one of these collections:
 * posts
 * favorited
 * user_favorites/uid
 * user_posts/uid
 */
Post.latest = function(collection) {
  var r = fbref.child(collection).orderByPriority().limitToFirst(10)

  r.once('value', function(snapshot) {
    var data = snapshot.val()

    if (!data) { return } // nothing available?

    var latest = Object.keys(data).reduce(function(acc, key) {
      acc.push(new Post(data[key], key))
      return acc
    }, []).sort(function(post1, post2) {
      return post2.date - post1.date
    })

    Post.trigger('store:posts:did:latest', collection, latest)
  })
}

// Initial creation of a post. Use update instead if the post already exists.
Post.persist = function persist(post) {
  var date = new Date()
  var attrs = _.merge(post.getattr(), {date: date.valueOf(), uid: post.uid})

  var r = post.fbrootref().push(attrs, function(error) {
    if (error) {
      Post.trigger('store:posts:failed:persist', post, error)
    } else {
      post.setattr({ key: r.key(), date: date})
      Post.trigger('store:posts:did:persist', post)
      r.setPriority(date.valueOf())
    }
  })
}

Post.update = function update(post) {
  post.fbpostref().update(post.getattr(), function(error){
    if (error) {
      Post.trigger('store:posts:failed:update', post, error)
    } else {
      Post.trigger('store:posts:did:update', post)
    }
  })
}

Post.toggleFav = function(post, uid) {
  var favers = _.merge({}, post.favers) // "clone"

  if (post.favoritedBy(uid)) { // toggle.
    delete favers[uid]
  } else {
    favers[uid] = true
  }

  post.fbpostref('favers').update(favers, function(error){
    if (error) {
      Post.trigger('store:posts:failed:togglefav', post, error)
    } else {
      post.favers = favers

      // update the refs for the owner of the post (note use of post.uid instead
      // of just uid of the user toggling the fav)
      var
        upstref = fbref.child('user_posts/' + post.uid + '/' + post.key),
        ufavref = fbref.child('user_favorites/' + post.uid + '/' + post.key)

      upstref.update(post.getattr())

      if (post.favoritedBy(post.uid)) {
        ufavref.update(post.getattr())
      } else {
        ufavref.remove() // may need to remove if no longer faved
      }

      // update the general list of all favorites
      var favsref = fbref.child('favorited/' + post.key)

      if (Object.keys(post.favers).length > 0) {
        favsref.update(post.getattr()) // someone still likes it!
      } else {
        favsref.remove() // nobody likes this anymore.
      }

      // update all other favers (may return empty array)
      otherUids = _.reject(Object.keys(favers).concat(uid), function(_uid) { return _uid == post.uid })

      otherUids.forEach(function(uid){
        var otherfav = fbref.child('user_favorites/' + uid + '/' + post.key)

        if (post.favoritedBy(uid)) {
          otherfav.update(post.getattr())
        } else {
          otherfav.remove()
        }
      })

      Post.trigger('store:posts:did:togglefav', post, uid)
    }
  })
}

// update the various post references (like latest posts, favorited, etc.)
function updatePostReferences(post) {
  var
    f = fbref, usf,
    pst = 'posts/' + post.key,
    fav = 'favorited/' + post.key,
    atr = _.merge(post.getattr(), {date: post.date.valueOf()})
    favUids = Object.keys(post.favers)

  if (post.destroyed) {
    f.child(fav).remove()
    f.child(pst).remove()
    favUids.forEach(function(uid){
      f.child('user_favorites/' + uid + '/' + post.key).remove()
    })
  } else {
    f.child(pst).set(atr)
    // fav addition is handled in toggleFav
  }
}

Post.on('store:posts:did:persist', updatePostReferences)
Post.on('store:posts:did:update', updatePostReferences)
Post.on('store:posts:did:destroy', updatePostReferences)
Post.on('store:posts:did:togglefav', updatePostReferences)

module.exports = Post
