var
  $ = require('../../lib/domWrap'),
  template = require('./message.html')

function Message(parent, node, options) {
  this.parent = parent

  var m = this, r = $(node).html(template(options))

  m.nodes = {
    root : r,
    text : r.select('.app-message-text'),
    dism : r.select('.app-message-dismiss')
  }

  m.mainDoMessageListener = function(text){
    m.show(text)
  }.bind(this)

  m.parent.on('module:message:do:message', m.mainDoMessageListener)

  m.nodes.dism.on('click', function(target) { m.dismiss() })
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
