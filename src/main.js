require('./modules/app-front.html')
require('./modules/app-message.html')
require('./modules/app-user.html')
require('./modules/app-post.html')

/*
 * Setup Data Stores
 */

var Posts = require('./app/posts')
var Users = require('./app/users')

var Dispatcher = require('./app/dispatcher')

Dispatcher.addStore(new Posts())
Dispatcher.addStore(new Users())

/*
 * Mount riot tags.
 */

var tags = require('riot').mount('*')

var tagsByName = tags.reduce(function(acc, val) {
  acc[val.root.tagName.toLowerCase().replace('app-', '')] = val
  return acc
}, {})

function displayModule(target) {
  var p, action, nodes = { 'front' : tagsByName['front'].root, 'user' : tagsByName['user'].root }

  for (var p in nodes) {
    action = (target == p) ? 'remove' : 'add'
    nodes[p].classList[action]('app-hidden')
  }
}

/*
 * Setup routes.
 */

var page = require('page')

page('/posts/favorites', function postsFavorites() {
  displayModule('user')
  Dispatcher.trigger('user:favorites')
})

page('/posts/new', function postsNew() {
  displayModule('user')
  Dispatcher.trigger('user:newpost')
})

page('/posts/', function posts() {
  displayModule('user')
  Dispatcher.trigger('user:posts')
})

page('/:user', function user(ctx, next) {
  displayModule('user')
  Dispatcher.trigger('user', ctx.params.user)
})

page('/', function root() {
  displayModule('front')
  Dispatcher.trigger('front')
})

page('*', function notfound() {
  displayModule('front')
  Dispatcher.trigger('front:notfound')
  Dispatcher.trigger('message', 'Sorry, we couldn\'t find the page you are looking.')
})

page()
