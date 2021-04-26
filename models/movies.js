const mongoose = require('mongoose');
const Joi = require('joi');
const { genreSchema } = require('./genre');

const Movie = mongoose.model('Movie', new mongoose.Schema({
    title: { type: String, require: true, minlength: 2, maxlength: 50 },
    genre: { type: genreSchema, required: true },
    numberInStock: { type: Number, required: true, min: 0, max: 10 },
    dailyRentalRate: { type: Number, required: true, min: 0, max: 100 }
}));

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

module.exports.Movie = Movie;
module.exports.validate = validateMovie;