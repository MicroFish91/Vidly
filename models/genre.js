const mongoose = require('mongoose');
const Joi = require('joi');

genreSchema = new mongoose.Schema({
    name: { type: String, 
        required: true,
        minlength: 4,
        maxlength: 30
    }
});

const Genre = mongoose.model('Genre', genreSchema);

// Validate Input
function validateGenres(userInput){
    const schema = Joi.object({
        name: Joi.string().alphanum().min(4).max(25).required()
    });
    return schema.validate(userInput);
}

exports.Genre = Genre;
exports.genreSchema = genreSchema;
exports.validate = validateGenres;