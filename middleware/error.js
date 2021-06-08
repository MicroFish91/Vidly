const winston = require('winston');

// Express Request Pipeline Error Handler
module.exports = function(err, req, res, next){
  // Log the exception
  winston.error(err.message, err);
  
  res.status(500).send("Internal server error.")
}