var
  User = require('../../app/user'),
  riot = require('riot')

require('../front/front')
require('../login/login')
require('../user/user')

function Main(rootNode) {
  riot.observable(this) // main can listen to events.

  this.rootNode = rootNode

  User.on('store:users:did:login', function(user){
    this.message('Thank you! You have been logged in.')
    user.update()
  }.bind(this))

  User.on('store:users:did:update', function(user) {
    this.router(user.uid, 'posts') // "redirect" to the user posts screen.
  }.bind(this))

  User.on('store:users:did:logout', function(){
    window.location.hash = '' // "redirect" home.
    this.message('You\'ve been logged out.')
  }.bind(this))

  User.on('module:user:failed:mount', function(){
    window.location.hash = '' // "redirect" home.
    this.message('Sorry, we could not find that user.')
  }.bind(this))
}

Main.prototype.message = function(text) {
  this.trigger('module:main:do:message', text)
}

Main.prototype.loadmod = function(modname, options) {
  if (this.lastmod) { this.lastmod.unload() }
  var ctor = require('../' + modname + '/' + modname)
  this.lastmod = new ctor(this, this.rootNode, options)
}

Main.prototype.newPost = function() {
  nav.on('module:navigation:did:newpost', function(user){
    if (window.location.hash != 'me/posts') {
      window.location.hash = 'me/posts/new'
    }
  })
}

/*
 * Parameters to this function come from the router (riot.route),
 * parsed from the location hash.
 */
Main.prototype.router = function(_uid, action, postid) {
  this.trigger('module:main:did:router')

  var user = User.current
  var uid = (_uid == 'me') ? user.uid : _uid

  switch(action) {
  case 'posts':
  case 'favorites':

    if (_uid == 'me' && !user.logged) {
      this.loadmod('login')
      this.message('Please login to access your posts.')

    } else {
      this.loadmod('user', {
        user: (user.uid == uid ? user : null),
        uid: uid,
        action: action
      })

      if (postid == 'new') {
        this.lastmod.showNewPost()
      }
    }

  break
  case 'logout':

    if (user.logged) {
      User.loggout()
    } else {
      window.location.hash = ''
    }

  break
  default:
    this.loadmod('front')
  }
}

module.exports = Main
