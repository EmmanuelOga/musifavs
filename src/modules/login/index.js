var template = require('./login.html')

function Front(ctx, node, options) {
  this.ctx = ctx

  this.node = node
  this.node.innerHTML = template(options)

  this.list = this.node.querySelector('.login-links')

  this.listener = function(ev) {
    ev.preventDefault()

    if (ev.target.id == 'twitter-login') {
      this.ctx.trigger('store:users:do:login', 'twitter')
    } else {
      this.ctx.trigger('module:message:do:show', 'Sorry, authenticating with this provider is not available yet.')
    }
  }.bind(this)

  this.list.addEventListener('click', this.listener)
}

Front.prototype.unload = function() {
  this.list.removeEventListener('click', this.listener)
  this.node.innerHTML = ''
  this.ctx.destroy()
}

module.exports = Front
