var riot = require('riot')
var Post = require('./post')
var Users = require('./users')

var fbref = new Firebase('https://musifavs.firebaseio.com')

/*
 * An observable Posts store.
 * Interaction with the rest of the app will be done through
 * the Dispatcher
 */
var Posts = riot.observable()

Posts.on('posts:destroy', function(post) {
  var uid = Users.current.uid
  var key = post.key
  var ref = fbref.child('user_posts/' + uid + '/' + key)

  ref.remove(function(error){
    if (error) {
      console.log(error)
    } else {
      Posts.trigger('posts:removed', uid, key)
    }
  })
})

Posts.on('posts:user:load', function(uid){
  var values = require('lodash/object/values')

  var ref = fbref.child('user_posts/' + uid)

  ref.orderByPriority().on('child_added', function(snapshot) {
    if (snapshot.val()) {
      Posts.trigger('posts:child_added', uid, new Post(snapshot.val(), snapshot.key()))
    }
  }, function(error) {
    console.log(error)
  })
})

module.exports = Posts
