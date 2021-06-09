require('express-async-errors');
require('winston-mongodb');
const winston = require('winston');

module.exports = function(){
  winston.exceptions.handle(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: 'uncaughtExceptions.log' })
  );
  process.on('unhandledRejection', (ex) => {
    throw(ex);
  });

  // Winston error transports (log to file and mongodb)
  winston.add(new winston.transports.File({ filename: 'logfile.log' }));
  winston.add(new winston.transports.MongoDB({ 
    db: 'mongodb://localhost:27017/vidly',
    level: 'info'
  }));
}









// Error Handlers
// process.on('uncaughtException', (ex) => {
//     winston.error(ex.message, ex);
//     process.exit(1);
// });