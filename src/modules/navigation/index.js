var template = require('./navigation.html')

function Navigation(ctx, node, options) {
  this.wrap = node
  this.wrap.innerHTML = template(options)

  this.ctx = ctx
  this.logout = node.querySelector('#nav-logout')
  this.newpost = node.querySelector('#nav-newpost')

  this.ctx.on('module:navigation:do:showlogout', function() { this.showlogout() }.bind(this))
  this.ctx.on('module:navigation:do:hidelogout', function() { this.hidelogout() }.bind(this))

  this.newpostlistener = function(ev) {
    ev.preventDefault()
    this.ctx.trigger('module:navigation:did:newpost')
  }.bind(this)

  this.newpost.addEventListener('click', this.newpostlistener)
}

Navigation.prototype.unload = function() {
  this.newpost.removeEventListener('click', this.newpostlistener)
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
