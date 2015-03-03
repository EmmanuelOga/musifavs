var _ = {
  isFunction : require('lodash/lang/isFunction')
}

/*
 * Defines a common API around DOM node handling. The API is inspired by
 * certain lib you may have heard about... :p
 */
function DomWrap(node, selector) {
  this[0] = this.node = node
  this.id = node.id

  if (selector) {
    this.node = node.querySelector(selector)
  }

  this.listeners = [] // save event listeners so we can unregister easily.
}

DomWrap.prototype.html = function(html) {
  this.node.innerHTML = html
  return this
}

DomWrap.prototype.prepend = function(node) {
  this.node.insertBefore(node, this.node.firstChild)
  return this
}

DomWrap.prototype.append = function(node) {
  this.node.appendChild(node)
  return this
}

DomWrap.prototype.remove = function(node) {
  this.node.removeChild(node)
  return this
}

DomWrap.prototype.text = function(text) {
  this.node.textContent = text
  return this
}

DomWrap.prototype.val = function() {
  if (arguments.length) { this.node.value = arguments[0] }
  return this.node.value
}

DomWrap.prototype.addClass = function(classname) {
  this.node.classList.add(classname)
  return this
}

DomWrap.prototype.removeClass = function(classname) {
  this.node.classList.remove(classname)
  return this
}

// Return first parent element matching selector
DomWrap.prototype.parent = function(selector) {
  var t = this.node.parentElement
  while (t) {
    if (t.matches(selector)) { return new DomWrap(t) }
    t = t.parentElement
  }
}

DomWrap.prototype.data = function(name) {
  return this.node.getAttribute('data-' + name)
}

/* This event handler prevents the event default action
 * and returns a wrapped event target instead in addition
 * to the original event.
 *
 * node.on('event', fun)
 * node.on('event', '.delegate-selector', fun)
 */
DomWrap.prototype.on = function(eventname, selector, callback) {
  var fn, n = this.node

  if (_.isFunction(selector)) {
    callback = selector
    fn = function(ev) {
      ev.preventDefault()
      callback(new DomWrap(ev.target), ev)
    }
  } else {
    fn = function(ev) {
      ev.preventDefault()

      var i, c, t = ev.target,
          candidates = n.querySelectorAll(selector),
          length = candidates.length

      while (t) {
        // Check if the target or one of their parents is equal
        // to any node matched with the delegate selector.
        for (i = 0; i < length; i++) {
          c = candidates[i]
          if (c.isEqualNode(t)) { return callback(new DomWrap(c), ev) }
        }

        // No need to check further than the node n (event listener)
        if (t.isEqualNode(n)) { return }

        t = t.parentElement
      }
    }
  }

  n.addEventListener(eventname, fn)

  this.listeners.push({eventname: eventname, fn: fn})

  return this
}

// call without parameters for removing all listeners.
DomWrap.prototype.off = function(eventname, callback) {
  if (arguments.length) {
      // don't worry about removing from this.listeners, removing twice is
      // harmless and this object should be short lived.
      this.node.removeEventListener(eventname, callback)
  } else {
    this.listeners.forEach(function(data) {
      this.node.removeEventListener(data.eventname, data.fn)
    }, this)
    this.listeners = []
  }

  return this
}

module.exports = function(node, selector) {
  return new DomWrap(node, selector)
}
