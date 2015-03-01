var template = require('./front.html')

function Front(ctx, node, options) {
  this.node = node
  this.node.innerHTML = template(options)
}

Front.prototype.unload = function() {
  this.node.innerHTML = ''
}

module.exports = Front
