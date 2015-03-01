var riot = require('riot') // router & observer

var Post = require('./app/post')
var User = require('./app/user')

var d = require('./lib/dispatcher')

// Register data stores with dispatcher.
d.addStore(Post)
d.addStore(User)

// Modules are small wrappers for inserting html templates into the page.

// Modules displayed all the time:
require('./modules/message').
  load(d, document.querySelector('#app-navigation'))

require('./modules/navigation').
  load(d, document.querySelector('#app-message'))

// "Page" Modules: (switched to display different things)
require('./modules/front')
require('./modules/login')
require('./modules/post')
require('./modules/user')

// App main node to load the modules into.
var n = document.querySelector('#app-main')

// Last module loaded, so we can unload() on demand.
var lastmod = null

function loadmod(module, options) {
  if (lastmod) { lastmod.unload() }
  console.log('displaying ' + module)
  require('./modules/' + module).load(n, options, d)
}

var tr = d.trigger

function message(msg) {
  tr('module:message:do:show', msg)
}

message('testing, 1, 2, 3')

/*
 * d wiring
 */

d.on('store:users:did:login', function(user){
  message('Thank you! You have been logged in.')
  tr('store:users:do:update', user)
})

d.on('store:users:did:update', function(user) {
  route(user.uid, 'posts') // "redirect" to the user posts screen.
})

d.on('store:users:did:logout', function(){
  message('You\'ve been logged out.')
  window.location.hash = '' // "redirect" home.
})

d.on('module:user:failed:mount', function(){
  message('Sorry, we could not find that user.')
  window.location.hash = '' // "redirect" home.
})

// parameters to these function come from the router (riot.router) parsed from
// the params
function route(_uid, action, postid) {
  var user = User.current
  var uid = (_uid == 'me') ? user.uid : _uid

  if (user.logged) {
    tr('module:navigation:do:showlogout')
  } else {
    tr('module:navigation:do:hidelogout')
  }

  switch(action) {
  case 'favorite':
    if (user.logged) {
      tr('store:posts:do:favorite', uid, postid)
    } else {
      message('Please login to favorite posts.')
      loadmod('login')
    }

    break

  case 'new':
  case 'posts':
  case 'favorites':

    if (uid) {
      loadmod('user', {uid: uid, action: action})
    } else {
      message('Please login to access your posts.')
      loadmod('login')
    }

    break

  case 'logout':

    if (user.logged) {
      tr('store:users:do:logout')
    } else {
      window.location.hash = ''
    }

    break

  default:
    loadmod('front')
  }
}

riot.route(route) // setup the routes
riot.route.exec(route) // Call the router w/o waiting for a hashchange event
