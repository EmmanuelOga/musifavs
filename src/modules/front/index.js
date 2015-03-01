var template = require('./front.html')

function Front(ctx, node, options) {
  this.ctx = ctx
  this.node = node
  this.node.innerHTML = template(options)
}

Front.prototype.unload = function() {
  this.node.innerHTML = ''
  this.ctx.destroy()
}

module.exports = Front
