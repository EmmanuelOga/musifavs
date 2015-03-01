var template = require('./navigation.html')

function Navigation() {
}

Navigation.prototype.load = function(node, options, ctx) {
  var html = template(options)
  node.innerHTML = html
  // node.querySelector('#nav-logout').classList.add('app-hidden')
}

module.exports = new Navigation()
