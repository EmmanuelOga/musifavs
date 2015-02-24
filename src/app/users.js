var riot = require('riot')
var User = require('./user')

/*
 * An observable Users store.
 * Interaction with the rest of the app will be done through
 * the Dispatcher (RiotController)
 */
function Users() {
  riot.observable(this)

  var currentUser
}

module.exports = Users
