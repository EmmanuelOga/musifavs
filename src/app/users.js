var riot = require('riot')
var User = require('./user')

var fbref = new Firebase('https://musifavs.firebaseio.com')

/*
 * An observable Users store.
 * Interaction with the rest of the app will be done through
 * the Dispatcher
 */
var Users = riot.observable()

Users.current = new User()

function updateAuth(newData) {
  var prevState = Users.current.isAuthenticated
    newState = Users.current.setAuthData(newData)

  if (newState && !prevState) {
    Users.trigger('users:auth:success')
  }
}

// Firebase will trigger this callback if authentication changes.
fbref.onAuth(function authDataCallback(authData) {
  if (authData) {
    updateAuth(authData)
  } else {
    Users.current.authData = null
    Users.current.isAuthenticated = false
    Users.trigger('users:auth:loggedout')
  }
})

Users.on('users:auth:logout', function() {
  fbref.unauth() // fb's onAuth callback should be triggered.
})

Users.on('users:auth:popup', function(provider) {
  fbref.authWithOAuthPopup(provider, function(error, authData) {
    if (error || !authData) {
      Users.trigger('users:auth:error', error || {code: 'UNKNOWN'})
    } else {
      updateAuth(authData)
    }
  })
})

// Take the chance to update the user information.
Users.on('users:auth:success', function() {
  var merge = require('lodash/object/merge')

  fbref.child('users').child(authData.uid).set(
    Users.current.attributes())
})

updateAuth(fbref.getAuth()) // NOTE: could be removed to avoid fb's sync. auth check

module.exports = Users
