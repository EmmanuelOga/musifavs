var
  $ = require('../../lib/domWrap'),
  Post = require('../../app/post'),
  itemstpl = require('./post-items.html'),
  template = require('./front.html')

function Front(parent, node, options) {
  this.parent = parent

  var f = this, r = $(node).html(template(options))

  this.nodes = {
    root      : r,
    posts     : $(node, '.latest-posts'),
    favorited : $(node, '.latest-favs')
  }

  f.handlePosts = function(collection, posts) {
    f.nodes[collection].html(itemstpl({ posts: posts }))
  }

  Post.on('store:posts:did:latest', f.handlePosts)

  Post.latest('posts')
  Post.latest('favorited')
}

Front.prototype.unload = function() {
  this.nodes.root.html('')
  Post.off('store:posts:did:latest', this.handlePosts)
}

module.exports = Front
