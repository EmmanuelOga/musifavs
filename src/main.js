require('./modules/app-front.html')
require('./modules/app-message.html')
require('./modules/app-user.html')
require('./modules/app-post.html')
require('./modules/app-authenticate.html')

/*
 * Setup Data Stores
 */

var Posts = require('./app/posts')
var Users = require('./app/users')

var Dispatcher = require('./app/dispatcher')

Dispatcher.addStore(Posts)
Dispatcher.addStore(Users)

/*
 * Mount riot tags.
 */

var tags = require('riot').mount('*')

var tagsByName = tags.reduce(function(acc, val) {
  acc[val.root.tagName.toLowerCase().replace('app-', '')] = val
  return acc
}, {})

function displayModule(target, pageTitle) {
  Dispatcher.trigger("display:" + target)

  var p, action, nodes = {
    'front' : tagsByName['front'].root,
    'user' : tagsByName['user'].root,
    'authenticate' : tagsByName['authenticate'].root,
  }

  for (var p in nodes) {
    action = (target == p) ? 'remove' : 'add'
    nodes[p].classList[action]('app-hidden')
  }

  if (pageTitle) {
    // Would be nice to do this through history.replaceState, but most browsers
    // don't support changing the title through that API (not even Canary!)
    document.pageTitle = pageTitle + ' - MusiFavs!'
  }
}

/*
 * Setup routes.
 */

var page = require('page')

// Before All.
page(function(ctx, next){
  updateLogoutButton()
  next()
})

page('/logout', function(){
  Dispatcher.trigger('users:auth:logout')
})

page('/authenticate', function postsFavorites(ctx) {
  if (Users.current.isAuthenticated) {
    Dispatcher.trigger('message', 'You are already authenticated!')
    page.redirect('/posts')
  } else {
    displayModule('authenticate', 'Log In')
  }
})

page('/favorites', ensureUserAuthenticated, function postsFavorites(ctx) {
  displayModule('user', 'User Favorites')
  Dispatcher.trigger('user:favorites')
})

page('/posts/new', ensureUserAuthenticated, function postsNew(ctx) {
  displayModule('user', 'New Post')
  Dispatcher.trigger('user:posts')
  Dispatcher.trigger('user:newpost')
})

page('/posts/', ensureUserAuthenticated, function posts(ctx) {
  page.redirect('/' + Users.current.uid)
})

page('/:uid', function user(ctx, next) {
  displayModule('user', 'User Profile')
  Dispatcher.trigger('user:cancelcreatepost') // in case it was left open
  Dispatcher.trigger('user:posts', ctx.params.uid)
})

page('/', function root(ctx) {
  displayModule('front')
  Dispatcher.trigger('front')
})

page('*', function notfound(ctx) {
  displayModule('front')
  Dispatcher.trigger('front:notfound')
  Dispatcher.trigger('message', 'Sorry, we couldn\'t find the page you are looking.')
})

/*
 * Authentication Stuff.
 */

function ensureUserAuthenticated(ctx, next) {
  var user = Users.current

  if (!user.isAuthenticated && ctx.pathnamne != '/authenticate') {
    page.redirect('/authenticate')
  } else {
    next()
  }
}

function updateLogoutButton() {
  var lb = document.querySelector('#logout-button')

  if (Users.current.isAuthenticated) {
    lb.classList.remove('app-hidden')
  } else {
    lb.classList.add('app-hidden')
  }
}

Dispatcher.on('users:auth:success', function(){
  updateLogoutButton()
})

Dispatcher.on('users:auth:loggedout', function(){
  updateLogoutButton()
  page.redirect('/')
  Dispatcher.trigger('message', 'You are now logged out')
})

/*
 * Go!
 */

page.start()
