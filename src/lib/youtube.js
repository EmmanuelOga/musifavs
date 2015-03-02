var urlregex = /youtube.com.+\?v=([a-zA-z0-9\-_]+)/i

exports.extractEmbed = function(url) {
  var match = urlregex.exec(url)

  if (match && match.length) {
    return {type: 'youtube', url: url, videoId: match[1]}
  } else {
    return {type: 'unknown', url: url}
  }
}
