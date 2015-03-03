var
  User = require('../../app/user'),
  riot = require('riot')

require('../front/front')
require('../login/login')
require('../user/user')

function Main(rootNode) {
  riot.observable(this) // main can listen to events.

  var m = this

  m.rootNode = rootNode

  m.on('module:user:failed:lookup', function(){
    window.location.hash = '' // "redirect" home.
    m.message('Sorry, we could not find that user.')
  })

  m.on('module:navigation:did:newpost', function(user){
    if (window.location.hash != '#me/posts') {
      window.location.hash = 'me/posts'
      m.showNewPost = true
    } else {
      m.lastmod.showNewPost()
    }
  })

  m.on('module:user:did:lookup', function(uid, user) {
    if (m.showNewPost) {
      m.lastmod.showNewPost()
      m.showNewPost = false
    }
  })

  User.on('store:users:did:login', function(user) {
    m.message('Thank you! You have been logged in.')
    user.update()
  })

  User.on('store:users:did:logout', function(){
    window.location.hash = '' // "redirect" home.
    m.message('You\'ve been logged out.')
  })
}

Main.prototype.message = function(text) {
  this.trigger('module:message:do:message', text)
}

Main.prototype.loadmod = function(name, options) {
  var m = this, Ctor = require('../' + name + '/' + name)
  if (m.lastmod) { m.lastmod.unload() }
  m.lastmod = new Ctor(m, m.rootNode, options)
}

/*
 * Parameters to this function come from the router (riot.route),
 * parsed from the location hash.
 */
Main.prototype.router = function(_uid, action, postid) {
  this.trigger('module:main:did:router')

  var m = this, user = User.current
  var uid = (_uid == 'me') ? user.uid : _uid

  switch(action) {
  case 'posts':
  case 'favorites':

    if (_uid == 'me' && !user.logged) {
      m.loadmod('login')
      m.message('Please login to access your posts.')

    } else {
      m.loadmod('user', {uid: uid, action: action})
    }

  break
  case 'logout':

    if (user.logged) { user.logout() }
    window.location.hash = ''

  break
  default:
    m.loadmod('front')
  }
}

module.exports = Main
