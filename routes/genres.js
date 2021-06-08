const express = require('express');
const auth = require('../middleware/auth');
const { Genre, validate } = require('../models/genre');
const router = express.Router();

// Display All Genres
router.get('/', auth, async (req, res, next) => {
  const genres = await Genre.find().sort('name');
  res.send(genres);
});

// Display a Specific ID
router.get('/:id', auth, async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  res.send(genre);
});

// Post a Genre
router.post('/', auth, async (req, res) => {
  // Validate
  const { error } = validate(req.body); // error = req.body.error
  // If invalid, return 400 error message
  if (error) return res.status(400).send(error.message);

  const genre = new Genre({
    name: req.body.name,
  });

  const result = await genre.save();
  res.send(result);
});

// Update a Specific Genre
router.put('/:id', auth, async (req, res) => {
  // Validate
  const { error } = validate(req.body); // error = req.body.error
  // If invalid, return 400 error message
  if (error) return res.status(400).send(error.message);

  // Update the course
  try {
    const genre = await Genre.findByIdAndUpdate({ _id: req.params.id }, {
      $set: {
        name: req.body.name,
      },
    }, { new: true });
    res.send(genre);
  }
  // If course does not exist, display 404 error message
  catch (e) {
    res.status(404).send('The genre with the given ID was not found.');
  }
});

// Delete an ID
router.delete('/:id', auth, async (req, res) => {
  try {
    const result = await Genre.deleteOne({ _id: req.params.id });
    res.send(result);
  } catch (e) {
    res.status(404).send('The genre with the given ID was not found.');
  }
});

module.exports = router;
