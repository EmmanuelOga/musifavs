var template = require('./form.html'),
  Post = require('../../app/post'),
  merge = require('lodash/object/merge'),
  values = require('lodash/object/values')

function PostForm(ctx, node, options) {
  this.ctx = ctx

  this.post = new Post(options.post)
  this.parent = options.parent

  this.node = node
  this.node.classList.add('app-post-form')
  this.node.innerHTML = template(merge({postKey: this.post.key || 'new'}, this.post))

  this.inputTitle = this.node.querySelector('input[name=title]')
  this.inputUrl = this.node.querySelector('input[name=url]')
  this.inputDesc = this.node.querySelector('textarea')
  this.formMessage = this.node.querySelector('.post-edit-message')

  this.updateForm()
}

PostForm.prototype.updateForm = function() {
  this.inputTitle.value = this.post.title
  this.inputUrl.value = this.post.embed.url || ''
  this.inputDesc.value = this.post.desc
}

PostForm.prototype.updatePost = function() {
  this.post.setattr({
    title: this.inputTitle.value,
    embed: {url: this.inputUrl.value },
    desc: this.inputDesc.value
  })
}

PostForm.prototype.unload = function() {
  this.node.classList.remove('app-post-form')
  this.node.innerHTML = ''
}

PostForm.prototype.isValid = function() {
  var result = this.post.validation()

  if (result.isValid) {
    return true
  } else {
    var msg = values(result.errors).join(', ')

    if (result.errors.url) {
      this.inputUrl.classList.add('invalid')
    } else {
      this.inputUrl.classList.remove('invalid')
    }

    if (result.errors.title) {
      this.inputTitle.classList.add('invalid')
    } else {
      this.inputTitle.classList.remove('invalid')
    }

    this.formMessage.textContent = 'Sorry, the post can\'t be saved: ' + msg + '.'

    return false
  }
}

module.exports = PostForm
