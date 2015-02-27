require('./modules/app-navigation.html')
require('./modules/app-message.html')
require('./modules/app-main.html')

require('./modules/app-login.html')
require('./modules/app-front.html')
require('./modules/app-post.html')
require('./modules/app-post-form.html')
require('./modules/app-post-show.html')
require('./modules/app-user.html')

/*
 * Setup Data Stores
 */

var Post = require('./app/post')
var User = require('./app/user')
var disp = require('./lib/dispatcher')

disp.addStore(Post)
disp.addStore(User)

require('riot').mount('app-message, app-main, app-navigation')

// See modules/app-main.html for main entry point of the application.
