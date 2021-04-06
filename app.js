const express = require('express');
const app = express();
const genres = require('./routes/genres');
const port = process.env.PORT || 3000;

// For accessing req.body
app.use(express.json());

// Routes
app.use('/api/genres', genres);

app.listen(port, () => console.log(`Listening on port ${port}`));