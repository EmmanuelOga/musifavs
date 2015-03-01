var template = require('./login.html')

function AppFront(ctx) {
}

AppFront.prototype.load = function(ctx, node, options) {
  var html = template(options)
  node.innerHTML = html

  tr = this.ctx.trigger

  node.querySelector('#twitter-login').addEventHandler('click', function(ev) {
    tr('store:users:do:login', 'twitter')
  })

  node.querySelector('#twitter-login').addEventHandler('click', function(ev) {
    tr('module:message:do:show', 'Authenticating with Google is not available yet.')
  })

  node.querySelector('#twitter-login').addEventHandler('click', function(ev) {
    tr('module:message:do:show', 'Authenticating with Facebook is not available yet.')
  })
}

module.exports = new AppFront()
