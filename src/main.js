var riot = require('riot') // router & observer

var Post = require('./app/post', 'Post')
var User = require('./app/user', 'User')

var dispatcher = require('./lib/dispatcher')

// Register data stores with dispatcher.
dispatcher.addStore(Post, 'Post')
dispatcher.addStore(User, 'User')

// Modules are small wrappers for inserting html templates into the page.

// Modules displayed all the time:
var Message = require('./modules/message'),
  Navigation = require('./modules/navigation')

var msgmod = new Message(dispatcher.context('Message'), document.querySelector('#app-message'))
var navmod = new Navigation(dispatcher.context('Navigation'), document.querySelector('#app-navigation'))

// "Page" Modules: (switched to display different things).
// Required so browserify can find them.
require('./modules/front')
require('./modules/login')
require('./modules/post')
require('./modules/user')

// App main node to load the modules into.
var main = document.querySelector('#app-main')

// Last module loaded, so we can unload() on demand.
var lastmod = null

function loadmod(module, options) {
  if (lastmod) {
    lastmod.unload()
  }

  console.log('displaying ' + module)

  var Ctor = require('./modules/' + module),
    // A dispatcher is a pub/sub object to trigger and listen to events.
    // A dispatcher context can be destroyed so all registered events get
    // destroyed at once.
    dispCtx = dispatcher.context(module),
    mod = new Ctor(dispCtx, main, options)

  lastmod = mod
}

/*
 * Parameters to this function come from the router (riot.router),
 * parsed from the location hash.
 */
function route(_uid, action, postid) {
  var user = User.current
  var uid = (_uid == 'me') ? user.uid : _uid

  if (user.logged) {
    dispatcher.trigger('module:navigation:do:showlogout')
  } else {
    dispatcher.trigger('module:navigation:do:hidelogout')
  }

  switch(action) {
  case 'favorite':
    if (user.logged) {
      dispatcher.trigger('store:posts:do:favorite', uid, postid)
    } else {
      message('Please login to favorite posts.')
      loadmod('login')
    }

    break

  case 'new':
  case 'posts':
  case 'favorites':

    if (uid) {
      loadmod('user', {user: (user.uid == uid ? user : null), uid: uid, action: action})
    } else {
      message('Please login to access your posts.')
      loadmod('login')
    }

    break

  case 'logout':

    if (user.logged) {
      console.log('logging out')
      dispatcher.trigger('store:users:do:logout')
    } else {
      window.location.hash = ''
    }

    break

  default:
    loadmod('front')
  }
}

/*
 * dispatcher wiring
 */

function message(msg) {
  dispatcher.trigger('module:message:do:show', msg)
}

dispatcher.on('store:users:did:login', function(user){
  message('Thank you! You have been logged in.')
  dispatcher.trigger('store:users:do:update', user)
})

dispatcher.on('store:users:did:update', function(user) {
  route(user.uid, 'posts') // "redirect" to the user posts screen.
})

dispatcher.on('store:users:did:logout', function(){
  message('You\'ve been logged out.')
  window.location.hash = '' // "redirect" home.
})

dispatcher.on('module:user:failed:mount', function(){
  message('Sorry, we could not find that user.')
  window.location.hash = '' // "redirect" home.
})

riot.route(route) // Setup route handler for hashchange event.
riot.route.exec(route) // Call the router w/o waiting for a hashchange.
