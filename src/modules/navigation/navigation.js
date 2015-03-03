var
  $ = require('../../lib/domWrap'),
  User = require('../../app/user'),
  riot = require('riot'),
  template = require('./navigation.html')

function Navigation(parent, node, options) {
  node.innerHTML = template(options)

  this.parent = parent

  this.nodes = {
    root    : $(node),
    logout  : $(node, '#nav-logout'),
    newpost : $(node, '#nav-newpost')
  }

  var user = User.current

  this.updateLogout = function() {
    if (user.logged) { this.showLogout() } else { this.hideLogout() }
  }.bind(this)

  this.parent.on('module:main:did:router', this.updateLogout)

  this.newpostListener = function(target) {
    this.trigger('module:navigation:did:newpost')
  }.bind(this)

  this.nodes.newpost.on('click', this.newpostListener)
}

Navigation.prototype.unload = function() {
  this.parent.off('module:main:did:router', this.updateLogout)
  this.nodes.newpost.on('click', this.newpostListener)
  this.nodes.root.html('')
}

Navigation.prototype.showLogout = function() {
  this.nodes.logout.removeClass('app-hidden')
}

Navigation.prototype.hideLogout = function() {
  this.nodes.logout.addClass('app-hidden')
}

module.exports = Navigation
