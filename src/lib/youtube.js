exports.extractVideoIdFromUrl = function(url) {
  var match = (/youtube.com.+\?v=([a-zA-z0-9]+)/i).exec(url)

  if (match && match.length) {
    return match[1]
  }
}
