var
  $        = require('../../lib/domWrap'),
  Post     = require('../../app/post'),
  itemstpl = require('./post-items.html'),
  template = require('./front.html')

function Front(parent, node, options) {
  node.innerHTML = template(options)

  this.parent = parent

  this.nodes = {
    root      : $(node),
    posts     : $(node, '.lastest-posts'),
    favorited : $(node, '.lastest-favs')
  }

  this.handlePosts = function(collection, posts) {
    this.nodes[collection].innerHTML = itemstpl({ posts: posts })
  }.bind(this)

  Post.on('store:posts:did:lastest', this.handlePosts)

  Post.lastest('posts')
  Post.lastest('favorited')
}

Front.prototype.unload = function() {
  this.nodes.root.html('')
  Post.off('store:posts:did:lastest', this.handlePosts)
}

module.exports = Front
