var
  $ = require('../../lib/domWrap'),
  User = require('../../app/user'),
  template = require('./login.html')

function Login(parent, node, options) {
  this.parent = parent

  var l = this, r = $(node).html(template(options))

  l.nodes = { root: r, list: r.select('.login-links') }

  l.loginListener = function(target) {
    if (target.id == 'twitter-login') {
      User.login('twitter')

    } else if (target.id == 'google-login') {
      User.login('google')

    } else {
      l.parent.message('Sorry, authenticating with this provider is not available yet.')
    }
  }

  l.nodes.list.on('click', l.loginListener)
}

Login.prototype.unload = function() {
  this.nodes.list.off('click', this.loginListener)
  this.nodes.root.html('')
}

module.exports = Login
