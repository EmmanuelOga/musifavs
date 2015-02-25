var fbref = new Firebase('https://musifavs.firebaseio.com')

/*
 * Simple wrapper around user objects.
 */
function User(opts) {
  this.isAuthenticated = false
  this.provider = 'unknown'
  this.authData = null
  this.uid = null
}

User.attributes = ['displayName', 'url', 'description', 'location', 'avatarUrl']

// TODO: set better defaults (e.g. a generic profile avatar)
User.defaults = User.attributes.reduce(function(acc, val) {
  acc[val] = 'unknown'
  return acc
}, {})


User.prototype.attributes = function() {
  var pick = require('lodash/object/pick')
  return pick(this, User.attributes)
}

/*
 * Update user data, and set default attributes if missing.
 * Returns self.
 */
User.prototype.updateDefaults = function(data) {
  var defaults = require('lodash/object/defaults')
  defaults(this, data, User.defaults)
  return this
}

/*
 * Update auth data (and profile attributes from it)
 * Return authentication state (boolean)
 */
User.prototype.setAuthData = function(newData) {
  this.authData = newData
  this.isAuthenticated = !!newData
  this.provider = newData.provider
  this.uid = newData.uid

  var data = {}

  switch(newData.provider) {
  case 'twitter':
    data.displayName = newData.twitter.displayName

    var p = newData.twitter.cachedUserProfile

    if (p) {
      data.url = p.url
      data.description = p.description
      data.location = p.location
      data.avatarUrl = p.profile_image_url_https
    }
  }

  this.updateDefaults(data)

  return this.isAuthenticated
}


module.exports = User
