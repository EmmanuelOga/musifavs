/*
 * Simple wrapper around post objects.
 */
function Post(opts) {
  var defaults = require('lodash/object/defaults')

  defaults(this, opts, {
    date: new Date(),
    title: '',
    desc: '',
    embed: {},
    favorited: false,
    isPersisted: false
  })
}

Post.demo = function() {
  return new Post({
    title: 'Oh my god!',
    desc: 'Jonathan Joestar Adventures',
    embed: {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=P9J5tYShNY8',
      videoId: 'P9J5tYShNY8'
    },
    isPersisted: true
  });
}

Post.prototype.update = function(opts) {
  var merge = require('lodash/object/merge')

  merge(this, opts)

  // try to update the embed type, if valid.
  if (opts.embed && opts.embed.url) {
    var youtubeMatch = (/youtube.com.+\?v=([a-zA-z0-9]+)/i).exec(opts.embed.url)

    if (youtubeMatch.length) {
      this.embed.type = 'youtube'
      this.embed.videoId = youtubeMatch[1]
    } else {
      this.embed.type = undefined
    }
  }

  return this
}

Post.prototype.save = function(callback) {
  this.isPersisted = true
  if (callback) callback(this)
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
