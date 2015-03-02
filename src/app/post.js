/*
 * When first created a Post object is just a holder for Post attributes
 * with some convenience methods for updating attributes, validating, etc.
 *
 * The Post function is also observable. Publishing and subscribing
 * to Post is the only way to interact with the abstract 'posts store'.
 *
 * EXAMPLE:
 *
 * var Post = require('app/post')
 *
 * var post = new Post({ title: 'Some title' })
 *
 * if (post.validation().isValid()) { Post.trigger('posts:do:persist', post) }
 *
 * Post.on('posts:did:persist', function(post) { console.log('post ' + post + '
 * was successfully created') })
 *
 * NOTE:
 *
 * Ultimately the main Firebase path for posts is built like this:
 * user_posts/uid/post_key : { ...post data... }
 */

var defaults = require('lodash/object/defaults'),
  merge = require('lodash/object/merge'),
  pick = require('lodash/object/pick')

var fbref = new Firebase('https://musifavs.firebaseio.com'),
  timeago = require('../lib/fromnow'),
  yt = require('../lib/youtube')

function Post(opts, key) {
  this.setattr(defaults({}, opts, {key: key}, Post.defaults))
}

Post.defaults = {
  date: undefined,
  desc: '',
  embed: {},
  favorited: false,
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

Post.prototype.toggleFav = function() {
  this.favorited = !this.favorited
}

Post.prototype.equals = function(other) {
  return this.key === other.key
}

Post.prototype.toString = function() {
  return JSON.stringify(pick(this.getattr(), ['title', 'key']))
}

// Returns only Post *data* attributes
Post.prototype.getattr = function() {
  return pick(this, Object.keys(Post.defaults))
}

// Sets attributes and derived/computed attributes
Post.prototype.setattr = function(opts) {
  merge(this, opts)

  this.stored = (this.key !== undefined)
  this.date = this.date ? new Date(this.date) : new Date()

  // TODO: parse other services (soundcloud, bandcamp, etc.)
  this.embed = yt.extractEmbed(this.embed)

  return this
}

// returns an object with validation results
Post.prototype.validation = function() {
  var r = { errors: [], isValid: true }

  if (!this.date instanceof Date) {
    r.errors.date = 'date is invalid'
    r.isValid = false
  }

  if (!this.title || this.title.length == 0) {
    r.errors.title = 'title can\'t be blank'
    r.isValid = false
  }

  if (!this.embed || !this.embed.type) {
    r.errors.url = 'the embed url is invalid'
    r.isValid = false
  }

  return r
}

// Returns a String formatted date.
Post.prototype.timeago = function() {
  return timeago(this.date)
}

// Firebase root of all user posts
Post.prototype.fbrootref = function() {
  return fbref.child('user_posts/' + this.uid)
}

// Firebase root of the specific user post
Post.prototype.fbpostref = function() {
  return this.fbrootref().child('/' + this.key)
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
})


var listeners = {}

// When called, store:posts:did:retrieve events will be triggered
// after firebase child_added events.
Post.retrieve = function retrieve(collection) {
  if (listeners[collection]) { return }

  var ref = fbref.child(collection).orderByPriority()

  listeners[collection] = ref.on('child_added', function(snapshot) {
    console.log(collection, listeners)
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
 * Returns lastest 10 items from one of these collections:
 * posts
 * favorited
 * user_favorites/uid
 * user_posts/uid
 */
Post.lastest = function(collection) {
  var ref = fbref.child(collection).orderByPriority().limitToFirst(10)

  ref.once('value', function(snapshot) {
    var data = snapshot.val()

    var lastest = Object.keys(data).reduce(function(acc, key) {
      acc.push(new Post(data[key], key))
      return acc
    }, []).sort(function(post1, post2) {
      return post2.date - post1.date
    })

    Post.trigger('store:posts:did:lastest', collection, lastest)
  })
}

// Initial creation of a post. Use update instead if the post already exists.
Post.persist = function persist(post) {
  var date = new Date()
  var attrs = merge(post.getattr(), {date: date.valueOf(), uid: post.uid})

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

// Keep a tally of latest posts and lastest favorited / user-favorited.
function favsAndLastestUpdater(post) {
  var favkey = 'favorited/' + post.key,
    postskey = 'posts/' + post.key,
    userfavkey = 'user_favorites/' + post.uid + '/' + post.key

  if (!post.destroyed && post.favorited) {
    var attrs = merge(post.getattr(), {date: post.date.valueOf()})
    fbref.child(favkey).set(attrs)
    fbref.child(postskey).set(attrs)
    fbref.child(userfavkey).set(attrs)
  } else {
    fbref.child(postskey).remove()
    fbref.child(favkey).remove()
    fbref.child(userfavkey).remove()
  }
}

Post.on('store:posts:did:persist', favsAndLastestUpdater)
Post.on('store:posts:did:update', favsAndLastestUpdater)
Post.on('store:posts:did:destroy', favsAndLastestUpdater)

module.exports = Post
