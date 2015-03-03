require('./app/user').setupCurrent() // Create instance of current user.

// Modules displayed all the time:
var
  Message = require('./modules/message/message'),
  Navigation = require('./modules/navigation/navigation'),
  Main = require('./modules/main/main')

var
  main = new Main(document.querySelector('#app-main')),
  msg = new Message(main, document.querySelector('#app-message')),
  nav = new Navigation(main, document.querySelector('#app-navigation'))

var riot = require('riot')

var router = main.router.bind(main) // riot misses the context otherwise.

riot.route(router) // Setup a router handler (hashchange event)
riot.route.exec(router) // Call the router w/o waiting for a hashchange (starts the app!)
