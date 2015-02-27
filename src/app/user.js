/*
 * When first created a User object is just a holder for User attributes
 * with some convenience methods for updating attributes, validating, etc.
 *
 * The User function is also observable. Publishing and subscribing
 * to User is the only way to interact with the abstract 'users store'.
 *
 * User.current holds a reference to the current user, which may or may not be
 * authenticated.
 *
 * EXAMPLE:
 *
 * var User = require('app/user')
 *
 * var current = User.current
 *
 * NOTE:
 *
 * Ultimately the main Firebase path for posts is built like this:
 * users/uid : { ...user data... }
 */

var fbref = new Firebase('https://musifavs.firebaseio.com'),
    defaults = require('lodash/object/defaults'),
    pick = require('lodash/object/pick')

function User(opts) {
  defaults(this, opts, User.defaults)
}

/*
 * Setup "current user" instance.
 */
User.current = new User()


// Extend the User *function* (not the instances) with pub/sub attributes.
require('riot').observable(User)

User.attributes = ['displayName', 'url', 'description', 'location', 'avatarUrl']

User.defaults = {
  'avatarUrl' : '/assets/profile.png',
  'description' : 'MusiFavs! user',
  'displayName' : 'user',
  'location' : 'Universe',
  'logged' : false,
  'url' : 'https://musifavs.com'
}

User.prototype.toString = function() {
  return JSON.stringify(this.getattr())
}

// Returns only *data* attributes
User.prototype.getattr = function() {
  return pick(this, User.attributes)
}

// Updates a user with the provided auth data.
function updateAuth(authData) {
  if (!authData) { return }

  var u = User.current

  u.uid = authData.uid
  u.authData = authData
  u.provider = authData.provider
  u.logged = true

  if (authData && authData.provider == 'twitter') {
    u.displayName = authData.twitter.displayName

    var p = authData.twitter.cacheduProfile

    if (p) {
      u.url = p.url
      u.description = p.description
      u.location = p.location
      u.avatarUrl = p.profile_image_url_https
    }

    // in case we picked some nulls from twittwer.
    defaults(this, u.defaults)
  }

}

User.on('store:users:do:logout', function() {
  fbref.unauth()
})

User.on('store:users:do:login', function(provider) {
  fbref.authWithOAuthPopup(provider, function(error, authData) {
    if (error || !authData) {
      User.trigger('store:users:failed:login', error || {code: 'UNKNOWN'})
    } else {
      updateAuth(authData)
    }
  })
})

User.on('store:users:do:update', function(user) {
  debugger
  fbref.child('users').child(user.uid).set(user.getattr(), function(error){
    if (error) {
      User.trigger('store:users:failed:update', user, error)
    } else {
      User.trigger('store:users:did:update', user)
    }
  })
})

User.on('store:users:do:lookup', function(uid) {
  fbref.child('users').child(uid).once('value', function(snapshot){
    if (snapshot.val()) {
      User.trigger('store:users:did:lookup', uid, new User(snapshot.val()))
    } else {
      User.trigger('store:users:failed:lookup', uid)
    }
  })
})

// Firebase will trigger this callback if authentication changes.
fbref.onAuth(function authDataCallback(authData) {
  if (authData) {
    updateAuth(authData)
    User.trigger('store:users:did:login', User.current, authData)
  } else {
    User.current.authData = null
    User.current.logged = false
    User.trigger('store:users:did:logout', User.current)
  }
})

// Eagerly check auth. state.
// NOTE: This could be removed to avoid fb's sync. auth check
updateAuth(fbref.getAuth())

module.exports = User
