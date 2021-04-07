const helmet = require('helmet');
const debug = require('debug')('app:startup');  // set env 'export DEBUG='app:startup'
const morgan = require('morgan'); // For developer mode, simplifies task of logging HTTP requests to and from app
const config = require('config');  // RC is also commonly used
const express = require('express');
const app = express();
const logger = require('./middleware/logger');
const genres = require('./routes/genres');
const home = require('./routes/home');
const port = process.env.PORT || 3000;

// Configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
console.log('Mail Password: ' + config.get('mail.password'));

// process.env.NODE_ENV (undefined if not set), app.get defaults to development if NODE_ENV undefined
// example of setting in console: export NODE_ENV=production
if (app.get('env') === 'development') {
    app.use(morgan('tiny')); 
    debug('Morgan enabled...');  // console.log()
}

// Views
app.set('view engine', 'pug'); // set the templating engine
app.set('views', './views'); // default, don't actually need this line unless you want to change

// The whole app.use() pipeline gets run through each time an HTTP request is made
app.use(express.json()); // For accessing req.body
app.use(logger);   // random middleware example, .use pipeline should come before routes or won't operate correctly
app.use(helmet());  // Helps secure your express app

// Routes
app.use('/api/genres', genres);
app.use('/', home);

app.listen(port, () => console.log(`Listening on port ${port}`));