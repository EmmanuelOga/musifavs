var
  $ = require('../../lib/domWrap'),
  template = require('./show.html'),
  User = require('../../app/user')

var _ = {
  merge : require('lodash/object/merge')
}

function PostShow(parent, node, options) {
  this.parent = parent

  var p = this.post = options.post,
    attr = _.merge(p.getattr(), {
      postKey: p.key || 'new',
      timeago: p.timeago(),
      owned: p.uid == User.current.uid
    })

  var r = $(node).addClass('app-post-show').html(template(attr))

  this.nodes = {
    root: r,
    fav: r.select('.fav')
  }

  this.updateFav()
}

PostShow.prototype.updateFav = function() {
  var p = this.post, f = this.nodes.fav

  if (p.favoritedBy(User.current.uid)) {
    f.addClass('post-favorited')
  } else {
    f.removeClass('post-favorited')
  }
}

PostShow.prototype.unload = function() {
  this.nodes.root.removeClass('app-post-show').html('')
}

module.exports = PostShow
