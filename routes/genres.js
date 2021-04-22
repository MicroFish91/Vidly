const express = require('express');
const { Genre, validate } = require('../models/genre');
const router = express.Router();

// Display All Genres
router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

// Display a Specific ID
router.get('/:id', async (req, res) => {
    try {
        const genre = await Genre.findById(req.params.id);
        res.send(genre);
    }
    catch(e) {
        res.status(404).send("The genre with the given ID was not found.");
    }    
});

// Post a Genre
router.post('/', async (req, res) => {

    // Validate
    const { error } = validate(req.body);  // error = req.body.error
    // If invalid, return 400 error message
    if (error) { res.status(400).send(error.message); return; }

    const genre = new Genre({
        name: req.body.name
    });

    const result = await genre.save();
    res.send(result);
});

// Update a Specific Genre
router.put('/:id', async (req, res) => {
    
    // Validate
    const { error } = validate(req.body);  // error = req.body.error
    // If invalid, return 400 error message
    if (error) { res.status(400).send(error.message); return; }

    // Update the course
    try {
        const genre = await Genre.findByIdAndUpdate({ _id: req.params.id }, {
            $set: {
                name: req.body.name
            }
        }, {new: true});
        res.send(genre);
    }
    // If course does not exist, display 404 error message
    catch(e){
        res.status(404).send("The genre with the given ID was not found.");
    }

});

// Delete an ID
router.delete('/:id', async (req, res) => {
    try {
        const result = await Genre.deleteOne({ _id: req.params.id });
        res.send(result);
    }
    catch(e){
        res.status(404).send("The genre with the given ID was not found.");
    }
});

module.exports = router;