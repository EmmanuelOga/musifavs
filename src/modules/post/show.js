var template = require('./show.html'),
    merge = require('lodash/object/merge')

function PostShow(events, node, options) {
  this.events = events

  this.post = options.post

  this.node = node
  this.node.classList.add('app-post-show')
  this.node.innerHTML = template(merge({
    postKey: this.post.key || 'new',
    timeago: this.post.timeago(),
    displayName: options.displayName
  }, this.post))

  this.ndfav = this.node.querySelector('a.fav')
  this.updateFav()
}

PostShow.prototype.updateFav = function() {
  if (this.post.favorited) {
    this.ndfav.classList.add('post-favorited')
  } else {
    this.ndfav.classList.remove('post-favorited')
  }
}

PostShow.prototype.unload = function() {
  this.node.classList.remove('app-post-show')
  this.node.innerHTML = ''
}

module.exports = PostShow
