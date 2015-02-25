var Users = require('./users')
var fbref = new Firebase('https://musifavs.firebaseio.com')
var fromnow = require('../vendor/fromnow')

/*
 * Simple wrapper around post objects.
 */
function Post(opts, key) {
  var defaults = require('lodash/object/defaults')

  defaults(this, opts, {
    title: '',
    desc: '',
    embed: {},
    favorited: false,
    isPersisted: false
  })

  this.date = this.date ? new Date(this.date) : new Date()

  if (key !== undefined) {
    this.isPersisted = true
    this.key = key
  }
}

Post.prototype.niceDate = function() {
  return fromnow(this.date)
}

Post.attributes = ['date', 'title', 'desc', 'embed', 'favorited']

Post.prototype.attributes = function() {
  var pick = require('lodash/object/pick')
  return pick(this, Post.attributes)
}

Post.prototype.setAttributes = function(opts) {
  var merge = require('lodash/object/merge')
  var yth = require('../lib/youtube')

  merge(this, opts)

  // Try to update the embed data
  // TODO: parse other services (soundcloud, bandcamp, etc.)
  var videoId = yth.extractVideoIdFromUrl((opts.embed || {}).url)

  if (videoId) {
    this.embed.type = 'youtube'
    this.embed.videoId = videoId
  }

  return this
}

Post.prototype.create = function(callback) {
  var merge = require('lodash/object/merge')
  var Posts = require('./posts')

  // Posts are always saved by the currently logged user
  var uid = Users.current.uid
  var ref = fbref.child('user_posts/' + uid)
  var date = new Date()
  var attrs = merge(this.attributes(), {date: date.valueOf(), uid: uid})

  var result = ref.push(attrs, function() {
    this.key = result.key()
    this.isPersisted = true
    this.date = date
    result.setPriority(date.valueOf())
    if (callback) { callback(this) }
    Posts.trigger('posts:user:saved', this)
  }.bind(this))
}

Post.prototype.save = function() {
  if (!this.key) {
    console.log("can't update a post without key")
  }

  // posts are always updated by the currently logged user
  var ref = fbref.child('user_posts/' + Users.current.uid + "/" + this.key)

  ref.update(this.attributes(), function(error){
    if (error) {
      console.log(error)
    } else {
      Posts.trigger('posts:user:updated', this)
    }
  })
}

Post.prototype.validationResult = function() {
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

  return r;
}

module.exports = Post
