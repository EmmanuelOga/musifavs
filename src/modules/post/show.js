var
  $ = require('../../lib/domWrap'),
  template = require('./show.html')

var _ = {
  merge : require('lodash/object/merge')
}

function PostShow(parent, node, options) {
  this.parent = parent

  var p = this.post = options.post

  node.innerHTML = template(_.merge(p.getattr(), {
    postKey: p.key || 'new',
    timeago: p.timeago()
  }))

  this.nodes = {
    root: $(node).addClass('app-post-show'),
    fav: $(node, '.fav')
  }

  this.updateFav()
}

PostShow.prototype.updateFav = function() {
  var p = this.post, f = this.nodes.fav

  if (p.favorited) {
    f.addClass('post-favorited')
  } else {
    f.removeClass('post-favorited')
  }
}

PostShow.prototype.unload = function() {
  this.nodes.root.removeClass('app-post-show').html('')
}

module.exports = PostShow
