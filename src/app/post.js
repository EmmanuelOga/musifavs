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

var listeners = {},
    fbref = new Firebase('https://musifavs.firebaseio.com'),
    timeago = require('../lib/fromnow'),
    yt = require('../lib/youtube'),

    // lodash stuff.
    defaults = require('lodash/object/defaults'),
    isDate = require('lodash/lang/isDate'),
    isEmpty = require('lodash/lang/isEmpty'),
    isString = require('lodash/lang/isString'),
    merge = require('lodash/object/merge'),
    pick = require('lodash/object/pick')

function Post(opts, key) {
  this.setattr(defaults({}, opts, {key: key}, Post.defaults))
}

// Extend the Post function (not the instances) with pub/sub properties.
require('riot').observable(Post)

Post.attributes = ['date', 'title', 'desc', 'embed', 'favorited']
Post.defaults = {title: '', desc: '', embed: {}, favorited: false, stored: false}

Post.prototype.unstored = function(other) {
  return isEmpty(this.key)
}

Post.prototype.equals = function(other) {
  return this.key === other.key
}

Post.prototype.toString = function() {
  return JSON.stringify(pick(this.getattr(), ['title', 'key']))
}

// Returns only Post *data* attributes
Post.prototype.getattr = function() {
  return pick(this, Post.attributes)
}

//
Post.prototype.setattr = function(opts) {
  merge(this, opts)

  this.stored = (this.key !== undefined)

  if (isString(this.date)) {
    this.date = new Date(Date.parse(this.date))
  } else if (! isDate(this.date)) {
    this.date = this.date ? new Date(this.date) : new Date()
  }

  if (opts.embed) {
    // TODO: parse other services (soundcloud, bandcamp, etc.)
    var videoId = yt.extractVideoIdFromUrl(opts.embed.url)

    if (videoId) {
      this.embed.type = 'youtube'
      this.embed.videoId = videoId
    }
  }

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

//
Post.prototype.fbrootref = function() {
  return fbref.child('user_posts/' + this.uid)
}

//
Post.prototype.fbpostref = function() {
  return this.fbrootref().child('/' + this.key)
}

// Destroy a Post
Post.on('store:posts:do:destroy', function(post) {
  fbref.remove(function(error){
    if (error) {
      Post.trigger('store:posts:failed:destroy', post, error)
    } else {
      Post.trigger('store:posts:did:destroy', post)
    }
  })
})

// when called, store:posts:did:retrieve events will be triggered
// after firebase child_added events.
Post.on('store:posts:do:retrieve', function retrieve(uid) {
  var ref, p

  if (!listeners[uid]) {
    // TODO: we *could* listen to child_changed too...
    // but let's keep it simple for now.
    ref = fbref.child('user_posts/' + uid).orderByPriority()

    listeners[uid] = ref.on('child_added', function(snapshot) {
      p = new Post(snapshot.val(), snapshot.key())
      Post.trigger('store:posts:did:retrieve', p)
    })
  }
})

Post.on('store:posts:do:stopretrieve', function stopretrieve(uid) {
  if (listeners[uid]) {
    fbref.off('child_added', listeners[uid])
    delete listeners[uid]
    Post.trigger('store:posts:did:stopretrieve', uid)
  }
})

// Initial creation of post. Trigger store:posts:do:update instead if the post already exists.
Post.on('store:posts:do:persist', function persist(post) {
  var date = new Date()
  var attrs = merge(post.getattr(), {date: date.valueOf(), uid: post.uid})

  var r = post.fbrootref().push(attrs, function(error) {
    if (error) {
      Post.trigger('store:posts:failed:persist', post, error)
    } else {
      post.setattr({ key: r.key(), stored: true, date: date})
      Post.trigger('store:posts:did:persist', post)
      r.setPriority(date.valueOf())
    }
  }.bind(this))
})

Post.on('store:posts:do:update', function update(post) {
  if (!post.key) {
    Post.trigger('store:posts:failed:update', post, 'a post needs to be persisted before being updatable')
  }

  post.fbpostref().update(post.getattr(), function(error){
    if (error) {
      Post.trigger('store:posts:failed:update', post, error)
    } else {
      Post.trigger('store:posts:did:update', post)
    }
  })
})

module.exports = Post
