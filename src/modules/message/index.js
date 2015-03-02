var template = require('./message.html')

function Message(events, node, options) {
  this.events = events

  this.wrap = node
  this.wrap.innerHTML = template(options)

  this.textn = node.querySelector('.app-message-text')
  this.dism = node.querySelector('.app-message-dismiss')

  this.listener = function(ev) {
    ev.preventDefault()
    this.dismiss()
  }.bind(this)

  this.dism.addEventListener('click', this.listener)

  this.events.on('module:message:do:show', function(msg) { this.show(msg) }.bind(this))
  this.events.on('module:message:do:dismiss', function() { this.dismismisss() }.bind(this))

  this.dismiss()
}

Message.prototype.unload = function() {
  this.events.destroy()
  this.dism.removeEventListener('click', this.listener)
  this.wrap.innerHTML = ''
}

Message.prototype.show = function(message) {
  this.wrap.classList.remove('app-hidden')
  this.textn.textContent = message
}

Message.prototype.dismiss = function() {
  this.wrap.classList.add('app-hidden')
  this.textn.textContent = ''
}

module.exports = Message
