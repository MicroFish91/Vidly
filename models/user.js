const mongoose = require('mongoose');
const Joi = require('joi');
const passwordComplexity = require("joi-password-complexity");
const config = require('config');
const jwt = require('jsonwebtoken');

userSchema = new mongoose.Schema({
    name: { type: String, minlength: 5, maxlength: 50, required: true },
    email: { type: String, unique: true, minlength: 5, maxlength: 100, required: true },
    password: { type: String, minlength: 5, maxlength: 255, required: true },
    isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model('User', userSchema);

// Validate Input
function validateUser(userInput){
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(100).email().required(),
        password: new passwordComplexity({
            min: 5,
            max: 255,
            lowerCase: 1,
            upperCase: 1,
            numeric: 1,
            requirementCount: 4
        })
    });
    return schema.validate(userInput);
}

exports.validate = validateUser;
exports.User = User;