var template = require('./login.html'),
    User = require('../../app/user')

function Front(events, node, options) {
  this.events = events

  this.node = node
  this.node.innerHTML = template(options)

  this.list = this.node.querySelector('.login-links')

  this.listener = function(ev) {
    ev.preventDefault()

    if (ev.target.id == 'twitter-login') {
      User.login('twitter')
    } else {
      this.events.trigger('module:message:do:show', 'Sorry, authenticating with this provider is not available yet.')
    }
  }.bind(this)

  this.list.addEventListener('click', this.listener)
}

Front.prototype.unload = function() {
  this.list.removeEventListener('click', this.listener)
  this.node.innerHTML = ''
  this.events.destroy()
}

module.exports = Front
