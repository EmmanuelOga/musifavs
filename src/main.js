'use strict';

require('./modules/app-front.html');
require('./modules/app-message.html');
require('./modules/app-user.html');

/*
 * Mount riot tags.
 */
var tags = require('riot').mount('*');

/*
 * Index tags by their HTML name.
 */
tags = tags.reduce(function(acc, val) {
  acc[val.root.tagName.toLowerCase()] = val;
  return acc;
}, {});

/*
 * Setup routes.
 */
var page = require('page');

page('/:user', function user() {
  displayModule('user');
});

page('/', function root() {
  displayModule('front');
});

page();

var nodes = {
  'front' : tags['app-front'].root,
  'user' : tags['app-user'].root
}

/*
 * Hide or show a given module tag.
 */
function displayModule(target) {
  for (var p in nodes) {
    var action = (target == p) ? 'remove' : 'add';
    nodes[p].classList[action]('app-hidden');
  }
}
