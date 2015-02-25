var riot = require('riot');

/*
 * Inspired by https://github.com/jimsparkman/RiotControl
 * Events triggered by the dispatcher or any registered store are fanned out to
 * all listeners
 */
function Dispatcher() {
  riot.observable(this);

  var triggers = []

  function callTriggers() {
    var args = [].slice.call(arguments);
    console.log('\u2022 triggering ' + args.join(', '))
    triggers.forEach(function(t){
      t.trigger.apply(null, args)
    });
  };

  this.addStore = function(store) {
    triggers.push({trigger: store.trigger, name: store.constructor.name});
    store.trigger = callTriggers;
  }

  this.addStore(this);
};

module.exports = new Dispatcher();
