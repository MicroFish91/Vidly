const express = require('express');
const router = express.Router();
const { Genre } = require('../models/genre');
const { Movie, validate } = require('../models/movies');

// Show All Movies
router.get('/', async(req, res) => {
    const movie = await Movie.find().sort('title');
    res.send(movie);
});

// Find a Movie by ID
router.get('/:id', async(req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        res.send(movie);
    }
    catch (e) {
        res.status(404).send('Movie with the given ID does not exist.');
    }
});

// Create Movie
router.post('/', async(req, res) => {

    const { error } = validate(req.body);
    if (error) { res.status(400).send(error.message); return; }

    try {
        const genre = await Genre.findById(req.body.genre);
        const movie = new Movie({
            title: req.body.title,
            genre: genre,
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
        });
    
        const result = await movie.save();
        res.send(result);
    }
    catch(e) {
        res.status(404).send("Genre ID does not exist.");
        return;
    }
});

// Update a Movie
router.put('/:id', async(req, res) => {
    const { error } = validate(req.body);
    if(error) {res.status(400).send(error.message); return;}

    try {
        const genre = await Genre.findById(req.body.genre);
        const result = await Movie.findByIdAndUpdate({ _id: req.params.id }, {
            $set: {
                title: req.body.title,
                genre: { 
                    _id: genre._id,
                    name: genre.name
                },
                numberInStock: req.body.numberInStock,
                dailyRentalRate: req.body.dailyRentalRate
            }}, {new: true});
        res.send(result);
    }
    catch(e) {
        res.status(404).send(e.message);
    }
});

// Delete a Movie
router.delete('/:id', async(req, res) => {
    try {
        const result = await Movie.deleteOne({ _id: req.params.id });
        res.send(result);
    }
    catch (e) {
        res.status(404).send('Movie with the given ID does not exist.');
    }
});

module.exports = router;