var template = require('./front.html')

function AppFront() {
}

AppFront.prototype.load = function(node, options, ctx) {
  node.innerHTML = template(options)
}

module.exports = new AppFront()
