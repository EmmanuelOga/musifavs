var
  $        = require('../../lib/domWrap'),
  template = require('./show.html')

var _ = {
  merge : require('lodash/object/merge')
}

function PostShow(parent, node, options) {
  this.parent = parent

  var p = this.post = options.post

  console.log(p.getattr())

  node.innerHTML = template(_.merge(p.getattr(), {
    postKey: p.key || 'new',
    timeago: p.timeago(),
    displayName: options.displayName
  }))

  var r = $(node)

  this.nodes = {
    root: r,
    fav: $(node, '.fav')
  }

  r.addClass('app-post-show')

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
  this.node.root.removeClass('app-post-show').html('')
}

module.exports = PostShow
