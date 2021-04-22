const mongoose = require('mongoose');
const Joi = require('joi');

const Genre = mongoose.model('Genre', new mongoose.Schema({
    name: { type: String, 
        required: true,
        minlength: 4,
        maxlength: 30
    }
}));

// Validate Input
function validateGenres(userInput){
    const schema = Joi.object({
        name: Joi.string().alphanum().min(4).max(25).required()
    });
    return schema.validate(userInput);
}

exports.Genre = Genre;
exports.validate = validateGenres;