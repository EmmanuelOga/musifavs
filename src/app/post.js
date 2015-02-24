/*
 * Simple wrapper around post objects.
 */
function Post(opts) {
  this['date'] = opts && opts['date'] || (new Date())
  this['title'] = opts && opts['title'] || 'Post Title'
  this['embed'] = opts && opts['embeddata'] || {type: 'youtube', videoId: 'P9J5tYShNY8'}
  this['desc'] = opts && opts['description'] || 'Post Description'
  this['favorited'] = opts && opts['favorited'] || true
}

module.exports = Post
