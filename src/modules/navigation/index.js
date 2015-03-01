var template = require('./navigation.html')

function Navigation(ctx, node, options) {
  this.wrap = node
  this.wrap.innerHTML = template(options)

  this.ctx = ctx
  this.logout = node.querySelector('#nav-logout')

  this.ctx.on('module:navigation:do:showlogout', function() { this.showlogout() }.bind(this))
  this.ctx.on('module:navigation:do:hidelogout', function() { this.hidelogout() }.bind(this))
}

Navigation.prototype.unload = function() {
  this.ctx.destroy()
  this.wrap.innerHTML = ''
}

Navigation.prototype.showlogout = function() {
  this.logout.classList.remove('app-hidden')
}

Navigation.prototype.hidelogout = function() {
  this.logout.classList.add('app-hidden')
}

module.exports = Navigation
