var
  $        = require('../../lib/domWrap'),
  User     = require('../../app/user'),
  template = require('./login.html')

function Login(parent, node, options) {
  node.innerHTML = template(options)

  this.parent = parent

  this.nodes = {
    root: $(node),
    list: $(node, '.login-links')
  }

  this.loginListener = function(target) {
    if (target.id == 'twitter-login') {
      User.login('twitter')
    } else {
      var p = this.parent
      p.message('Sorry, authenticating with this provider is not available yet.')
    }
  }.bind(this)

  this.nodes.list.on('click', this.loginListener)
}

Login.prototype.unload = function() {
  this.nodes.list.off('click', this.loginListener)
  this.nodes.root.html('')
}

module.exports = Login
