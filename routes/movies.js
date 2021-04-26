const mongoose = require('mongoose');
const express = require('express');
const Joi = require('joi');
const router = express.Router();
const { genreSchema, Genre } = require('../models/genre');
// const { Customer, validate } = require('../models/customer');

const Movie = mongoose.model('Movie', new mongoose.Schema({
    title: { type: String, require: true, minlength: 2, maxlength: 50 },
    genre: { type: genreSchema, required: true },
    numberInStock: { type: Number, required: true, min: 0, max: 10 },
    dailyRentalRate: { type: Number, required: true, min: 0, max: 100 }
}));

// Create Movie
router.post('/', async(req, res) => {

    const { error } = validateMovie(req.body);
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

// Validate Input
function validateMovie(userInput){
    const schema = Joi.object({
        title: Joi.string().min(2).max(50).required(),
        genre: Joi.string().required(),
        numberInStock: Joi.number().integer().positive().max(10).required(),
        dailyRentalRate: Joi.number().positive().max(100).required()
    });
    return schema.validate(userInput);
}

module.exports = router;