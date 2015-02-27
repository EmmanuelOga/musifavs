/*
 * Mounter:
 *
 * noun
 * 1. a person or thing that mounts. :-)
 *
 * This display helper mounts riot tags and remembers them. A second call to
 * display would first unmount the lasttags tag.
 *
 * Additionally the tag name is added to the css classes of the dom node you
 * mount to.
 *
 * SAMPLE:
 *
 * // on your html:
 * <div id="some-id"></div>
 *
 * // on your code:
 * var Mounter = require('mounter')
 * var m = new Mounter('#some-id')
 *
 * // mount a tag:
 * m.display('custom-riot-tag', {optional: 'options'})
 *
 * // replace the lasttags tag (unmount) with the new one
 * m.display('another-riot-tag', {optional: 'options'})
 *
 * // result:
 * <div id="some-id" class="another-riot-tag"></div>
 */

var riot = require('riot')

function Mounter() {
  this.lasttags = []
}

/* (selector, tag, opts) :: parameters passed to riot.mount
 *
 * The tagname is added as a class name to the resulting dom element.
 *
 * I.e. if you mount <tag> into <div>,
 * the resulting dom node will be <div class='tag'>
 */
Mounter.prototype.display = function(selector, tagname, opts) {

  this.lasttags.forEach(function(tag) {
    tag.root.classList.remove(tagname)
    tag.unmount()
  })

  // tags may return a single element or an array.
  var tags = riot.mount(selector, tagname, opts || {})

  this.lasttags = [].concat(tags)

  this.lasttags.forEach(function(tag) {
    tag.root.classList.add(tagname)
  })

}

module.exports = Mounter
