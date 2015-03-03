var
  $ = require('../../lib/domWrap'),
  Post = require('../../app/post'),
  User = require('../../app/user'),
  PostForm = require('../post/form'),
  PostShow = require('../post/show'),
  proftpl = require('./profile.html'),
  template = require('./user.html')

function UserMod(parent, node, options) {
  this.parent = parent

  this.mods = {} // store PostShow and PostForm modules.

  this.action = options.action
  this.uid = options.uid
  this.firebasepath = 'user_' + this.action + '/' + this.uid

  node.innerHTML = template(this)

  var r = $(node)

  this.nodes = {
    root      : r,
    newpost   : $(node, '.app-new-post'),
    placehold : $(node, '.app-post-placeholder'),
    posts     : $(node, '.app-posts'),
    prof      : $(node, '.profile')
  }

  this.userDidLookup = function(uid, user) {
    this.user = user
    this.redrawProfile()
    Post.retrieve(this.firebasepath)
    this.parent.trigger('module:user:did:lookup', uid, user)
  }.bind(this)

  this.userFailedLookup = function (uid) {
    this.parent.trigger('module:user:failed:lookup', uid)
  }.bind(this)

  this.postsDidRetrieve = function(firebasepath, post){
    var u = this, m = this.mods[post.key]
    if (m) { u.showmod(m) } else { u.addPost(post) }
  }.bind(this)

  this.postsDidUpdate = function(post){
    var u = this, m = this.mods[post.key]
    if (m) { u.showmod(m) }
  }.bind(this)

  var actionMod = function(target) {
    var key = target.parent('.post-actions').data('post-key')
    return this.mods[key]
  }.bind(this)

  r.on('click', '.fav', function(target) {
    var mod = actionMod(target)
    Post.toggleFav(mod.post, User.current.uid)
  }.bind(this))

  r.on('click', '.edit', function(target) {
    var mod = actionMod(target)
    this.editPost(mod)
  }.bind(this))

  r.on('click', '.remove', function(target) {
    var mod = actionMod(target)
    this.removePost(mod)
  }.bind(this))

  r.on('click', '.undo', function(target) {
    var mod = actionMod(target)
    if (mod.post.stored) {
      this.showmod(mod)
    } else {
      this.hideNewPost()
    }
  }.bind(this))

  r.on('click', '.save', function(target) {
    var mod = actionMod(target)

    mod.updatePost()

    if (!mod.isValid()) {
      // do nothing, the form will show an error message.
    } else if (mod.post.stored) {
      Post.update(mod.post)
    } else {
      Post.persist(mod.post)
      this.hideNewPost()
    }
  }.bind(this))

  User.on('store:users:failed:lookup' , this.userFailedLookup)
  User.on('store:users:did:lookup'    , this.userDidLookup)
  Post.on('store:posts:did:retrieve'  , this.postsDidRetrieve)
  Post.on('store:posts:did:update'    , this.postsDidUpdate)

  User.lookup(this.uid)
}

UserMod.prototype.unload = function() {
  this.nodes.root.off().html('') // unregister all event handlers.

  User.off('store:users:failed:lookup' , this.userFailedLookup)
  User.off('store:users:did:lookup'    , this.userDidLookup)
  Post.off('store:posts:did:retrieve'  , this.postsDidRetrieve)
  Post.off('store:posts:did:update'    , this.postsDidUpdate)

  Post.stopRetrieve(this.firebasepath)
}

UserMod.prototype.updatePlaceholder = function() {
  var modkeys = Object.keys(this.mods), p = this.nodes.placehold

  if (modkeys.length == 0 || modkeys[0] == 'new') {
    p.removeClass('app-hidden')
  } else {
    p.addClass('app-hidden')
  }
}

UserMod.prototype.redrawProfile = function() {
  this.nodes.prof.html(proftpl(this))
}

UserMod.prototype.hideNewPost = function() {
  var m = this.mods.new, n = this.nodes.newpost
  if (m) {
    m.unload()
    n.html('')
    delete this.mods['new']
    this.updatePlaceholder()
  }
}

UserMod.prototype.showNewPost = function() {
  var m = this, el, p
  if (!m.mods.new) {
    el = document.createElement('div')
    p = new Post({uid : m.uid, userName : m.user.displayName})
    m.mods['new'] = new PostForm(m, el, {post : p})
    m.nodes.newpost.append(el)
    m.updatePlaceholder()
  }
}

UserMod.prototype.editPost = function(mod) {
  var el = mod.nodes.root[0]
  mod.unload()
  this.mods[mod.post.key] = new PostForm(this, el, {post : mod.post})
}

UserMod.prototype.addPost = function(post) {
  var m = this, el = document.createElement('div'),
    p = new PostShow(m, el, {post : post})
  m.mods[post.key] = p
  m.nodes.posts.prepend(p.nodes.root[0])
  m.updatePlaceholder()
}

// Show a post that was previously being edited, or update it if the data changed.
UserMod.prototype.showmod = function(mod) {
  if (mod instanceof PostForm) {
    mod.unload()
    var ps = new PostShow(this, mod.nodes.root[0], {post : mod.post})
    this.mods[mod.post.key] = ps
  } else {
    mod.updateFav() // update just fav flag for now.
  }
}

UserMod.prototype.removePost = function(mod) {
  Post.destroy(mod.post)
  mod.unload()
  this.nodes.posts.remove(mod.nodes.root[0])
  delete this.mods[mod.key]
  this.updatePlaceholder()
}

module.exports = UserMod
