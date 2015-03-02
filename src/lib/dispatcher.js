var riot = require('riot')
var reject = require('lodash/collection/reject')
var uniqueId = require('lodash/utility/uniqueId')

/*
 * Inspired by https://github.com/jimsparkman/RiotControl
 *
 * A disp allows for tying together different "stores" (pub/sub APIs).
 *
 * Events triggered by the dispatcher or any registered store are fanned out to
 * *all* listeners.
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
 * User.destroy(user) // -> triggers, say, 'user:did:destroy' event.
 *
 * disp.on('user:did:destroy', function(user) {
 *   News.trigger('news:did:report', 'Did you hear? User ' + user + 'was deleted!')
 * })
 *
 */

function Dispatcher() {
  riot.observable(this)

  var triggers = []

  function trigger() {
    var args = [].slice.call(arguments)
    triggers.forEach(function(t){
      // console.log('\u2022 Triggering ' + t.name + ':' + args.join(', '))
      t.trigger.apply(null, args)
    })
  }

  this.addStore = function(store, _name) {
    var name = _name || store.constructor.name
    triggers.push({trigger: store.trigger, name: name})
    store.trigger = trigger
    // console.log('\u2022 Added store: ' + name + '. Now tracking ' + triggers.length)
  }

  this.removeStore = function(name) {
    var before = triggers.length
    triggers = reject(triggers, function(t) { return t.name === name })
    var after = triggers.length
    // console.log('\u2022 Destroyed ' + name + '. Deleted ' + (b - a) + ' stores. Now tracking ' + a + ' stores.')
  }

  this.addStore(this)
}

/* Creates a proxy observer that gets registered as a new store. The proxy
 * contains an additional 'destroy()' method that unregisters every callback
 * that was previously registered through it, and removes itself from the
 * dispatcher.
 */
Dispatcher.prototype.context = function(_name) {
  var dispatcher = this, proxy = riot.observable()

  proxy.name = (_name || '') + uniqueId('Context')

  dispatcher.addStore(proxy, proxy.name)

  proxy.destroy = function() {
    proxy.trigger('destroy')
    dispatcher.removeStore(proxy.name)
    proxy.off('*')
    // cheap fail-fast counter measure :-)
    proxy.trigger = proxy.one = proxy.off = proxy.on = 'destroyed'
  }

  return proxy
}

module.exports = new Dispatcher()
