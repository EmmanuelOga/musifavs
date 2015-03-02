var template = require('./front.html')
  itemstpl = require('./post-items.html'),

  Post = require('../../app/post')

function Front(events, node, options) {
  this.events = events
  this.node = node
  this.node.innerHTML = template(options)

  this.ndlastest = this.node.querySelector('.lastest-posts')
  this.ndfavs = this.node.querySelector('.lastest-favs')

  var target = {
    'posts' : this.ndlastest,
    'favorited' : this.ndfavs
  }

  Post.lastest('posts')
  Post.lastest('favorited')

  this.events.on('store:posts:did:lastest', function(collection, posts) {
    target[collection].innerHTML = itemstpl({posts: posts})
  })
}

Front.prototype.unload = function() {
  this.node.innerHTML = ''
  this.events.destroy()
}

module.exports = Front
