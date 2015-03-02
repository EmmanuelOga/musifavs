var maintpl = require('./user.html'),
    proftpl = require('./profile.html'),
    merge = require('lodash/object/merge'),
    reject = require('lodash/collection/reject'),
    Post = require('../../app/post'),
    PostShow = require('../post/show'),
    PostForm = require('../post/form')

function User(ctx, node, options) {
  var qs, on

  this.ctx = ctx
  this.postmods = {}

  merge(this, options)

  // fb path will be displaying (can be either favorites or all posts)
  this.collection = 'user_' + this.action + '/' + this.user.uid

  this.node = node
  this.node.innerHTML = maintpl(this)

  qs = this.node.querySelector.bind(this.node)

  this.ndnewpost = qs('.app-new-post')
  this.ndplacehold = qs('.app-post-placeholder')
  this.ndposts = qs('.app-posts')
  this.ndprof = qs('.profile')

  this.updatePlaceholder()

  on = function(name, cbk) {
    ctx.on(name, cbk.bind(this))
  }.bind(this)

  this.ctx.trigger('store:users:do:lookup', this.uid)

  on('store:users:failed:lookup', function(uid) {
    this.ctx.trigger('module:user:failed:mount', uid)
  })

  on('store:users:did:lookup', function(uid, user) {
    this.ctx.trigger('store:posts:do:retrieve', this.collection)
    this.user = user
    this.redrawProfile()
  })

  on('store:posts:did:retrieve', function(collection, post){
    this.updatePlaceholder()
    this.addPost(post)
  })

  on('module:user:do:newpost', function(user) {
    this.showNewPost()
  })

  on('store:posts:did:update', function(post){
    var key = post.key,
      postmod = this.postmods[key]
    this.showPost(postmod)
  })

  on('module:navigation:did:newpost', function(){
    this.showNewPost()
  })

  // Clicks handler
  this.postslistener = (function(ev) {
    var n = ev.target

    if ((/i/i).test(n.tagName)) {
      n = n.parentNode
    }

    var classes = n.classList,
      key = n.parentNode.getAttribute('data-post-key'),
      postmod = this.postmods[key]

    if (classes.contains('fav')) {
      ev.preventDefault()
      postmod.post.toggleFav()
      this.ctx.trigger('store:posts:do:update', postmod.post)

    } else if (classes.contains('edit')) {
      ev.preventDefault()
      this.editPost(postmod)

    } else if (classes.contains('remove')) {
      ev.preventDefault()
      this.removePost(postmod)

    } else if (classes.contains('undo')) {
      ev.preventDefault()

      if (postmod.post.stored) {
        this.showPost(postmod)
      } else {
        this.hideNewPost()
      }

    } else if (classes.contains('save')) {
      ev.preventDefault()

      postmod.updatePost()

      if (!postmod.isValid()) {
        // do nothing, the form will show an error message.
      } else if (postmod.post.stored) {
        this.ctx.trigger('store:posts:do:update', postmod.post)
      } else {
        this.ctx.trigger('store:posts:do:persist', postmod.post)
        this.hideNewPost()
      }

    } else {
      // do nothing.
    }
  }).bind(this)

  this.node.addEventListener('click', this.postslistener)
}

User.prototype.updatePlaceholder = function() {
  var mods = Object.keys(this.postmods).length,
     showingnew = this.postmods['new']

  if (mods == 0 || (mods == 1 && showingnew)) {
    this.ndplacehold.classList.remove('app-hidden')
  } else {
    this.ndplacehold.classList.add('app-hidden')
  }
}

User.prototype.redrawProfile = function() {
  this.ndprof.innerHTML = proftpl(this)
}

User.prototype.showNewPost = function() {
  if (!this.postmods['new']) {
    this.updatePlaceholder()
    var el = document.createElement('div')
    this.postmods['new'] = new PostForm(this.ctx, el, {post: new Post({uid: this.uid, userName: this.user.displayName})})
    this.ndnewpost.appendChild(el)
  }
}

User.prototype.hideNewPost = function() {
  var postmod = this.postmods['new']
  if (postmod) {
    postmod.unload()
    this.ndnewpost.removeChild(postmod.node)
    delete this.postmods['new']
  }
  this.updatePlaceholder()
}

User.prototype.addPost = function(post) {
  var el = document.createElement('div')
  var p = this.postmods[post.key] = new PostShow(this.ctx, el, {post: post, displayName: this.user.displayName})
  this.ndposts.insertBefore(p.node, this.ndposts.firstElementChild)
}

User.prototype.editPost = function(postmod) {
  var el = postmod.node
  postmod.unload()
  this.postmods[postmod.post.key] = new PostForm(this.ctx, el, {post: postmod.post})
}

// show a post that was previously being edited, or update it if the data changed.
User.prototype.showPost = function(postmod) {
  var el = postmod.node

  if (postmod instanceof PostForm) {
    postmod.unload()
    this.postmods[postmod.post.key] = new PostShow(this.ctx, el, {post: postmod.post})
  } else {
    postmod.updateFav() // update just fav flag for now.
  }
}

User.prototype.removePost = function(postmod) {
  this.ctx.trigger('store:posts:do:destroy', postmod.post)
  postmod.unload()
  this.ndposts.removeChild(postmod.node)
  delete this.postmods[postmod.key]
  this.updatePlaceholder()
}

User.prototype.unload = function() {
  this.node.removeEventListener('click', this.postslistener)
  this.node.innerHTML = ''
  this.ctx.trigger('store:posts:do:stopretrieve', this.collection)
  this.ctx.destroy()
}

module.exports = User
