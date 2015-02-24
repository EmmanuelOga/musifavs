var riot = require('riot')
var Post = require('./post')

/*
 * An observable Posts store.
 * Interaction with the rest of the app will be done through
 * the Dispatcher (RiotController)
 */
function Posts() {
  riot.observable(this)

  var self = this

  this.on("posts:user:load", function(){
    self.trigger("posts:user:available", [new Post(), new Post()])
  })
}

module.exports = Posts
