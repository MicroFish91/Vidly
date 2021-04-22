const mongoose = require('mongoose');
const Joi = require('joi');

const Video = mongoose.model('Video', new mongoose.Schema({
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

exports.Video = Video;
exports.validate = validateGenres;