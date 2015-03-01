/*
message(msg) {
  this.msg.innerText = msg
}

undo(ev) {
  tr('module:post-form:did:cancel')
}

publish(ev) {
  var newPost = new Post(this.post).setAttributes({
    title: this.postTitle.value,
    desc: this.postDescription.value,
    embed: {url: this.embedUrl.value}
  })

  var result = newPost.validationResult()

  if (result.isValid) {
    if (this.post.isPersisted) {
      newPost.save()
      this.parent.show(newPost)
    } else {
      newPost.create()
      tr('user:cancelcreatepost', newPost)
    }
  } else {
    var msg = values(result.errors).join(', ')
    this.urlInvalid = !!result.errors.url
    this.titleInvalid = !!result.errors.title
    this.message('Sorry, the post can\'t be saved: ' + msg + '.')
  }
}
*/
