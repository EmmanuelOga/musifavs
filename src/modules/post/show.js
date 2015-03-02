var template = require('./show.html'),
    merge = require('lodash/object/merge')

function PostShow(ctx, node, options) {
  this.ctx = ctx

  this.post = options.post

  this.node = node
  this.node.classList.add('app-post-show')
  this.node.innerHTML = template(merge({postKey: this.post.key || 'new', timeago: this.post.timeago()}, this.post))
}

PostShow.prototype.unload = function() {
  this.node.classList.remove('app-post-show')
  this.node.innerHTML = ''
}

module.exports = PostShow
