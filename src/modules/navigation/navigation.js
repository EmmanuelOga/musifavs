var
  $ = require('../../lib/domWrap'),
  User = require('../../app/user'),
  riot = require('riot'),
  template = require('./navigation.html')

function Navigation(parent, node, options) {
  this.parent = parent

  var n = this, r = $(node).html(template(options))

  n.nodes = {
    root    : r,
    logout  : $(node, '#nav-logout'),
    newpost : $(node, '#nav-newpost')
  }

  n.updateLogout = function() {
    if (User.current.logged) { n.showLogout() } else { n.hideLogout() }
  }

  n.newpostListener = function(target) {
    n.parent.trigger('module:navigation:did:newpost')
  }

  n.parent.on('module:main:did:router', n.updateLogout)
  n.nodes.newpost.on('click', n.newpostListener)
}

Navigation.prototype.unload = function() {
  var n = this
  n.parent.off('module:main:did:router', n.updateLogout)
  n.nodes.newpost.on('click', n.newpostListener)
  n.nodes.root.html('')
}

Navigation.prototype.showLogout = function() {
  this.nodes.logout.removeClass('app-hidden')
}

Navigation.prototype.hideLogout = function() {
  this.nodes.logout.addClass('app-hidden')
}

module.exports = Navigation
