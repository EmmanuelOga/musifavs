/*

this.posts = []
this.newPost = null

this.dtr('store:users:do:lookup', opts.uid)

this.don('store:users:failed:lookup', function(uid) {
  this.dtr('module:user:failed:mount', uid)
})

this.don('store:users:did:lookup', function(uid, user) {
  this.dtr('store:posts:do:retrieve', uid)
  this.update({user: user})
}.bind(this))

this.don('store:posts:did:retrieve', function(post){
  this.posts.unshift(post)
  this.update()
}.bind(this))

this.don('store:posts:did:destroy', function(post) {
  var reject = require('lodash/collection/reject')
  var posts = reject(posts, function(post){ return post.key == key })
  this.update({posts: posts})
}.bind(this))

this.don('user:newpost', function(user) {
  this.update({newPost: new Post()})
}.bind(this))

this.don('module:user:do:cancelcreatepost', function() {
  this.update({newPost: null})
}.bind(this))

this.don('destroy', function(){
  if (this.user) {
   this.dtr('store:posts:do:stopretrieve', this.user.uid)
  }
})

*/
