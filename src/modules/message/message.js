var
  $ = require('../../lib/domWrap'),
  template = require('./message.html')

function Message(parent, node, options) {
  node.innerHTML = template(options)

  this.parent = parent

  this.nodes = {
    root : $(node),
    text : $(node, '.app-message-text'),
    dism : $(node, '.app-message-dismiss')
  }

  this.mainDoMessageListener = function(text){
    this.show(text)
  }.bind(this)

  this.parent.on('module:message:do:message', this.mainDoMessageListener)

  this.nodes.dism.on('click', function(target) {
    this.dismiss()
  }.bind(this))
}

Message.prototype.unload = function() {
  this.parent.off('module:main:do:message', this.mainDoMessageListener)
  this.nodes.dism.off()
  this.nodes.root.html('')
}

Message.prototype.show = function(message) {
  this.nodes.root.removeClass('app-hidden')
  this.nodes.text.text(message)
}

Message.prototype.dismiss = function() {
  this.nodes.root.addClass('app-hidden')
  this.nodes.text.text('')
}

module.exports = Message
