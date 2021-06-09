const debug = require('debug')('app:startup');  // set env 'export DEBUG='app:startup'
const morgan = require('morgan'); // For developer mode, simplifies task of logging HTTP requests to and from app

module.exports = function(app) {
  // process.env.NODE_ENV (undefined if not set), app.get defaults to development if NODE_ENV undefined
  // example of setting in console: export NODE_ENV=production
  if (app.get('env') === 'development') {
    app.use(morgan('tiny')); 
    debug('Morgan enabled...');  // console.log()
  }
}

