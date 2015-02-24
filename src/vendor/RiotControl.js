var riot = require("riot");

/*
 * Adapted from https://github.com/jimsparkman/RiotControl
 */
function RiotControl() {
  riot.observable(this);

  var triggers = []

  function callTriggers() {
    var args = [].slice.call(arguments);
    triggers.forEach(function(t){
      // console.log("triggered " + args + " on " + t.name);
      t.trigger.apply(null, args)
    });
  };

  this.addStore = function(store) {
    triggers.push({trigger: store.trigger, name: store.constructor.name});
    store.trigger = callTriggers;
  }

  this.addStore(this);
};

module.exports = new RiotControl();
