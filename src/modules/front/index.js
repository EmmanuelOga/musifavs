var template = require('./front.html')
  itemstpl = require('./post-items.html')

function Front(ctx, node, options) {
  this.ctx = ctx
  this.node = node
  this.node.innerHTML = template(options)
  this.node.classList.add('app-front')

  this.ndlastest = this.node.querySelector('.lastest-posts')
  this.ndfavs = this.node.querySelector('.lastest-favs')

  this.ctx.trigger('store:posts:do:lastest')

  this.ctx.on('store:posts:did:lastest', function(posts) {
    this.ndlastest.innerHTML = itemstpl({posts: posts})
  }.bind(this))
}

Front.prototype.unload = function() {
  this.node.classList.remove('app-front')
  this.node.innerHTML = ''
  this.ctx.destroy()
}

module.exports = Front
