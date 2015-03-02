var template = require('./front.html')
  itemstpl = require('./post-items.html')

function Front(ctx, node, options) {
  this.ctx = ctx
  this.node = node
  this.node.innerHTML = template(options)

  this.ndlastest = this.node.querySelector('.lastest-posts')
  this.ndfavs = this.node.querySelector('.lastest-favs')

  var target = {
    'posts' : this.ndlastest,
    'favorited' : this.ndfavs
  }

  this.ctx.trigger('store:posts:do:lastest', 'posts')
  this.ctx.trigger('store:posts:do:lastest', 'favorited')

  this.ctx.on('store:posts:did:lastest', function(collection, posts) {
    target[collection].innerHTML = itemstpl({posts: posts})
  }.bind(this))
}

Front.prototype.unload = function() {
  this.node.innerHTML = ''
  this.ctx.destroy()
}

module.exports = Front
