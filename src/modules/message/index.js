var template = require('./message.html')

function Message() {
}

Message.prototype.load = function(ctx, node, options) {
  this.wrap = node

  this.wrap.classList.add('app-message')
  this.wrap.innerHTML = template(options)

  this.textn = node.querySelector('.app-message-text')
  this.dism = node.querySelector('.app-message-dismiss')

  this.listener = function(ev) { this.dismiss() }.bind(this)
  this.dism.addEventListener('click', this.listener)

  this.ctx = ctx
  this.ctx.on('module:message:do:show', function(msg) { this.show(msg) }.bind(this))
  this.ctx.on('module:message:do:dismiss', function() { this.dismismisss() }.bind(this))

  this.dismiss()
}

Message.prototype.unload = function() {
  this.wrap.classList.remove('app-message')
  this.wrap.innerHTML = ''
  this.dism.removeEventListener('click', this.listener)
  this.ctx.destroy()
}

Message.prototype.show = function(message) {
  this.wrap.classList.remove('app-hidden')
  this.textn.textContent = message
}

Message.prototype.dismiss = function() {
  this.wrap.classList.add('app-hidden')
  this.textn.textContent = ''
}

module.exports = new Message()
