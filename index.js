const express = require('express');
const helmet = require('helmet');
const winston = require('winston');
const app = express();

app.use(helmet());  // Secure header

require('./startup/config')(); // Windows: 'set vidly_jwtPrivateKey=mySecureKey'; Mac: 'export vidly_jwtPrivateKey=mySecureKey'
require('./startup/dev')(app);
require('./startup/logger')(); // Winston
require('./startup/routes')(app);
require('./startup/db')();  // Mongoose
require('./startup/validation')();  // Joi

const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));