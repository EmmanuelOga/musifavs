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

var _ = {
  defaults : require('lodash/object/defaults'),
  pick     : require('lodash/object/pick')
}

var fbref = new Firebase('https://musifavs.firebaseio.com')

function User(opts, uid) {
  _.defaults(this, opts, User.defaults)

  // if current user was instantiated more than once.
  if (User.current && User.current.uid === uid) {
    _.defaults(this, User.current)
  }
}

User.defaults = {
  'avatarUrl'   : '/assets/profile.png',
  'description' : 'MusiFavs! user',
  'displayName' : 'user',
  'location'    : 'Universe',
  'logged'      : false,
  'provider'    : 'unknown',
  'url'         : 'https://musifavs.com'
}

/*
 *******************************************************************************
 * Instance Methods
 *******************************************************************************
 */

// Returns only *data* attributes
User.prototype.getattr = function() {
  return _.pick(this, Object.keys(User.defaults))
}

User.prototype.logout = function() {
  this.authData = null
  this.logged = false
  this.provider = 'unknown'
  this.uid = null
}

// update fb data
User.prototype.update = function() {
  var user = this
  if (!user.uid) { return }
  fbref.child('users' + '/' + user.uid).set(user.getattr(), function(error) {
    if (error) {
      User.trigger('store:users:failed:update', user)
    } else {
      User.trigger('store:users:did:update', user)
    }
  })
}

User.prototype.toString = function() {
  return JSON.stringify(_.pick(this.getattr(), ['displayName', 'logged']))
}

/*
 *******************************************************************************
 * "Static" Methods
 *******************************************************************************
 */

// Extend the User *function* (not the instances) with pub/sub attributes.
require('riot').observable(User)

// Updates a user with the provided auth data.
function updateAuth(authData) {
  if (!authData) { return }

  var u = User.current

  u.uid = authData.uid
  u.authData = authData
  u.provider = authData.provider
  u.logged = true

  if (authData.provider == 'twitter') {
    u.displayName = authData.twitter.displayName

    var p = authData.twitter.cachedUserProfile

    if (p) {
      u.avatarUrl = p.profile_image_url_https
      u.description = p.description
      u.location = p.location
      u.url = p.url
    }
  } else if (authData.provider == 'google') {
    u.displayName = authData.google.displayName

    var p = authData.google.cachedUserProfile

    if (p) {
      u.avatarUrl = p.picture
      u.description = 'G+ User'
      u.location = 'Planet Earth'
      u.url = p.link
    }
  }

  _.defaults(this, u.defaults) // in case we picked up some nulls

  u.update()
}

User.login = function(provider) {
  fbref.authWithOAuthPopup(provider, function(error, authData) {
    if (error || !authData) {
      User.trigger('store:users:failed:login', error || {code: 'unknown'})
    } else {
      updateAuth(authData)
    }
  })
}

User.logout = function() {
  if (User.current && User.current.logged) {
    User.current.logout()
    fbref.unauth()
  }
}

User.lookup = function(uid) {
  fbref.child('users').child(uid).once('value', function(snapshot){
    var data = snapshot.val()
    if (data) {
      User.trigger('store:users:did:lookup', uid, new User(data, uid))
    } else {
      User.trigger('store:users:failed:lookup', uid)
    }
  })
}

// creates the User.current instance.
User.setupCurrent = function() {
  User.current = new User()

  fbref.onAuth(function(authData) {
    if (authData) {
      updateAuth(authData)
      User.trigger('store:users:did:login', User.current, authData)
    } else {
      User.current.logout()
      User.trigger('store:users:did:logout', User.current)
    }
  })
  // updateAuth(fbref.getAuth()) // NOTE: removed to avoid fb's sync. auth check
}

module.exports = User
