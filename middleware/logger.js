/* 
    Middleware functions are functions that have access to the request object (req), the response object (res), 
    and the next function in the application’s request-response cycle. The next function is a function in the
    Express router which, when invoked, executes the middleware succeeding the current middleware.
*/

function log(req, res, next) {
    console.log('Logging...');
    next();
}

module.exports = log;