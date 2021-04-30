const mongoose = require('mongoose');
const Joi = require('joi');

const User = mongoose.model('User', new mongoose.Schema({
    name: { type: String, minlength: 5, maxlength: 50, required: true },
    email: { type: String, unique: true, minlength: 5, maxlength: 100, required: true },
    password: { type: String, minlength: 5, maxlength: 255, required: true }
}));

// Validate Input
function validateUser(userInput){
    const schema = Joi.object({
        name: Joi.string().alphanum().min(5).max(50).required(),
        email: Joi.string().alphanum().min(5).max(100).email().required(),
        password: Joi.string().alphanum().min(5).max(255).required()
    });
    return schema.validate(userInput);
}

exports.validate = validateUser;
exports.User = User;