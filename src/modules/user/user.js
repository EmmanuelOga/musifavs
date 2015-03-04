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

  var u = this

  u.mods = {} // store PostShow and PostForm modules.

  u.action = options.action
  u.uid = options.uid
  u.firebasepath = 'user_' + u.action + '/' + u.uid

  var r = $(node).html(template(u))

  u.nodes = {
    root      : r,
    newpost   : $(node, '.app-new-post'),
    placehold : $(node, '.app-post-placeholder'),
    posts     : $(node, '.app-posts'),
    prof      : $(node, '.profile')
  }

  u.userDidLookup = function(uid, user) {
    u.user = user
    u.redrawProfile()
    Post.retrieve(u.firebasepath)
    u.parent.trigger('module:user:did:lookup', uid, user)
  }

  u.userFailedLookup = function (uid) {
    u.parent.trigger('module:user:failed:lookup', uid)
  }

  u.postsDidRetrieve = function(firebasepath, post){
    var m = u.mods[post.key]
    if (m) { u.showmod(m) } else { u.addPost(post) }
  }

  u.postsDidUpdate = function(post){
    var m = u.mods[post.key]
    if (m) { u.showmod(m) }
  }

  var actionMod = function(target) {
    var key = target.parent('.post-actions').data('post-key')
    return u.mods[key]
  }

  r.on('click', '.fav', function(target) {
    var mod = actionMod(target)
    Post.toggleFav(mod.post, User.current.uid)
  })

  r.on('click', '.edit', function(target) {
    u.editPost(actionMod(target))
  })

  r.on('click', '.remove', function(target) {
    u.removePost(actionMod(target))
  })

  r.on('click', '.undo', function(target) {
    var mod = actionMod(target)
    if (mod.post.stored) {
      u.showmod(mod)
    } else {
      u.hideNewPost()
    }
  })

  r.on('click', '.save', function(target) {
    var mod = actionMod(target)
    mod.updatePost()

    if (!mod.isValid()) {
      // do nothing, the form will show an error message.
    } else if (mod.post.stored) {
      Post.update(mod.post)
    } else {
      Post.persist(mod.post)
      u.hideNewPost()
    }
  })

  User.on('store:users:failed:lookup' , u.userFailedLookup)
  User.on('store:users:did:lookup'    , u.userDidLookup)
  Post.on('store:posts:did:retrieve'  , u.postsDidRetrieve)
  Post.on('store:posts:did:update'    , u.postsDidUpdate)
  Post.on('store:posts:did:togglefav' , u.postsDidUpdate)

  User.lookup(u.uid)
}

UserMod.prototype.unload = function() {
  var u = this

  u.nodes.root.off().html('') // unregister all event handlers.

  User.off('store:users:failed:lookup' , u.userFailedLookup)
  User.off('store:users:did:lookup'    , u.userDidLookup)
  Post.off('store:posts:did:retrieve'  , u.postsDidRetrieve)
  Post.off('store:posts:did:update'    , u.postsDidUpdate)
  Post.off('store:posts:did:togglefav' , u.postsDidUpdate)

  Post.stopRetrieve(u.firebasepath)
}

UserMod.prototype.updatePlaceholder = function() {
  var modkeys = Object.keys(this.mods), p = this.nodes.placehold

  if (modkeys.length > 0 || this.mods['new']) {
    p.addClass('app-hidden')
  } else {
    p.removeClass('app-hidden')
  }
}

UserMod.prototype.redrawProfile = function() {
  this.nodes.prof.html(proftpl(this))
}

UserMod.prototype.hideNewPost = function() {
  var u = this, m = u.mods.new, n = u.nodes.newpost
  if (m) {
    m.unload()
    n.html('')
    delete u.mods['new']
  }
  u.updatePlaceholder()
}

UserMod.prototype.showNewPost = function() {
  var u = this, el, post
  if (!u.mods.new) {
    el = document.createElement('div')
    post = new Post({uid : u.uid, userName : u.user.displayName})
    u.mods['new'] = new PostForm(u, el, {post : post})
    u.nodes.newpost.append(el)
  }
  u.updatePlaceholder()
}

UserMod.prototype.editPost = function(mod) {
  var u = this, el = mod.nodes.root[0]
  mod.unload()
  u.mods[mod.post.key] = new PostForm(u, el, {post : mod.post})
}

UserMod.prototype.addPost = function(post) {
  var u = this, el = document.createElement('div'),
    pmod = new PostShow(u, el, {post : post})
  u.mods[post.key] = pmod
  u.nodes.posts.prepend(pmod.nodes.root[0])
  u.updatePlaceholder()
}

// Show a post that was previously being edited, or update it if the data changed.
UserMod.prototype.showmod = function(mod) {
  var u = this
  if (mod instanceof PostForm) {
    mod.unload()
    var pmod = new PostShow(u, mod.nodes.root[0], {post : mod.post})
    u.mods[mod.post.key] = pmod
  } else {
    mod.updateFav() // update just fav flag for now (could handle live udpates ITF)
  }
}

UserMod.prototype.removePost = function(mod) {
  var u = this
  mod.unload()
  Post.destroy(mod.post)
  u.nodes.posts.remove(mod.nodes.root[0])
  delete u.mods[mod.post.key]
  u.updatePlaceholder()
}

module.exports = UserMod
