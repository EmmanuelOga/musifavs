var urlregex = /youtube.com.+\?v=([a-zA-z0-9\-_]+)/i

exports.extractVideoIdFromUrl = function(url) {
  var match = urlregex.exec(url)

  if (match && match.length) {
    return match[1]
  }
}
