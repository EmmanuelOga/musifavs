var _ = {
  merge  : require('lodash/object/merge'),
  values : require('lodash/object/values')
}

var
  $        = require('../../lib/domWrap'),
  Post     = require('../../app/post'),
  template = require('./form.html')

function PostForm(parent, node, options) {
  this.parent = parent
  this.post = new Post(options.post)

  node.innerHTML = template(_.merge({
    postKey: this.post.key || 'new'
  }, this.post))

  var r = $(node)

  this.nodes = {
    root: r,
    formMessage: $(node, '.post-edit-message'),
    inputDesc: $(node, 'textarea'),
    inputTitle: $(node, 'input[name=title]'),
    inputUrl: $(node, 'input[name=url]')
  }

  r.addClass('app-post-form')

  this.updateForm()
}

PostForm.prototype.unload = function() {
  this.nodes.root.removeClass('app-post-form').html('')
}

PostForm.prototype.updateForm = function() {
  var n = this.nodes, p = this.post
  n.inputTitle.val(p.title)
  n.inputUrl.val(p.embed.url || '')
  n.inputDesc.val(p.desc)
}

PostForm.prototype.updatePost = function() {
  var n = this.nodes
  this.post.setattr({
    title: n.inputTitle.val(),
    embed: {url: n.inputUrl.val() },
    desc: n.inputDesc.val()
  })
}

PostForm.prototype.isValid = function() {
  var result = this.post.validation(), n = this.nodes

  n.inputUrl.removeClass('invalid')
  n.inputTitle.removeClass('invalid')

  if (result.isValid) {
    return true
  } else {
    if (result.errors.url) { n.inputUrl.addClass('invalid') }
    if (result.errors.title) { n.inputTitle.addClass('invalid') }

    var msg = _.values(result.errors).join(', ')
    n.formMessage.text('Sorry, the post can\'t be saved: ' + msg + '.')

    return false
  }
}

module.exports = PostForm
