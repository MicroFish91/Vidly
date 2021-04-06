const express = require('express');
const router = express.Router();
const Joi = require('joi');

var genres = [
    {id: 1, name: 'horror'},
    {id: 2, name: 'romance'}
];

// Display All Genres
router.get('/', (req, res) => {
    res.send(genres);
});

// Display a Specific ID
router.get('/:id', (req, res) => {
    const genre = genres.find((g) => g.id === parseInt(req.params.id));
    !genre ? res.status(404).send('This genre with the given ID was not found.') : 
    res.send(genre);
});

// Update a Specific Genre
router.put('/:id', (req, res) => {
    // Look up the course
    const genre = genres.find((g) => g.id === parseInt(req.params.id));
    // If course does not exist, display 404 error message
    if (!genre) res.status(404).send('This genre with the given ID was not found.');

    // Validate
    const { error } = validateInput(req.body);  // error = req.body.error
    // If invalid, return 400 error message
    if (error) res.status(400).send(error.message);

    // Update Course
    genre.name = req.body.name;  // find allows you to update 
    // Return updated course
    res.send(genres);
});

// Delete an ID
router.delete('/:id', (req, res) => {
    // Check if id exists
    const genre = genres.find((g) => g.id === parseInt(req.params.id));
    if (!genre) res.status(404).send('This genre with the given ID was not found.');

    // Delete
    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    // Show what was deleted
    res.send(genre);
});

// Validate Input
function validateInput(userInput){
    const schema = Joi.object({
        name: Joi.string().alphanum().min(3).max(12).required()
    });
    return schema.validate(userInput);
}

module.exports = router;