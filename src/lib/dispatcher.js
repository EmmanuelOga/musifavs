var riot = require('riot')
var reject = require('lodash/collection/reject')
var uniqueId = require('lodash/utility/uniqueId')

/*
 * Inspired by https://github.com/jimsparkman/RiotControl
 *
 * A disp allows for tying together different "stores" (pub/sub APIs).
 * Events triggered by the dispatcher or any registered store are fanned out to
 * *all* listeners. This way Stores don't have to know each other but different
 * stores can be controlled from the same place.
 *
 * EXAMPLE:
 *
 * var User = require('user')
 * var News = require('news')
 *
 * var disp = require('dispatcher')
 *
 * disp.addStore(User)
 * disp.addStore(News)
 *
 * // Destroy a user
 * disp.trigger('user:do:destroy', user)
 *
 * disp.on('user:did:destroy', function(user) {
 *   News.trigger('user:did:destroy', 'Did you hear? User ' + user + 'was deleted!')
 * })
 *
 */

function Dispatcher() {
  riot.observable(this)

  var triggers = []

  function callTriggers() {
    var args = [].slice.call(arguments)
    triggers.forEach(function(t){
      // console.log('\u2022 Triggering ' + t.name + ':' + args.join(', '))
      t.trigger.apply(null, args)
    })
  }

  this.addStore = function(store, _name) {
    var name = _name || store.constructor.name
    triggers.push({trigger: store.trigger, name: name})
    store.trigger = callTriggers
  }

  this.removeStore = function(name) {
    var b = triggers.length
    triggers = reject(triggers, function(t) {
      return t.name === name
    })
    var a = triggers.length
    console.log('\u2022 Destroying ' + name + ' deleted ' + (b - a) + ' stores. Now tracking ' + triggers.length)
  }

  this.addStore(this)
}

/* A context returns a proxy observer that gets registered as a new store.  The
 * proxy contains an additional 'destroy()' method that unregisters every
 * callback that was previously registered and removes itself from the original
 * dispatcher.
 */
Dispatcher.prototype.context = function(_name) {
  var disp = this, proxy = riot.observable()

  proxy.name = (_name || '') + uniqueId('dispatcherProxy')

  proxy.destroy = function() {
    proxy.trigger('destroy')
    disp.removeStore(proxy.name)
    proxy.off('*')
    // cheap fail-fast counter measure :-)
    proxy.trigger = proxy.one = proxy.off = proxy.on = 'destroyed'
  }

  disp.addStore(proxy, proxy.name)

  return proxy
}

module.exports = new Dispatcher()
