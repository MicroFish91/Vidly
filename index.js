const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');  // RC is more commonly used
const express = require('express');
const app = express();
const genres = require('./routes/genres');
const port = process.env.PORT || 3000;

// Configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));

// process.env.NODE_ENV (undefined if not set), app.get defaults to development if NODE_ENV undefined
// example of setting in console: export NODE_ENV=production
if (app.get('env') === 'development') {
    app.use(morgan('tiny')); // For developer mode, simplifies task of logging HTTP requests to and from app
    console.log('Morgan enabled...');
}

app.use(express.json()); // For accessing req.body
app.use(helmet());  // Helps secure your express app

// Routes
app.use('/api/genres', genres);

app.listen(port, () => console.log(`Listening on port ${port}`));