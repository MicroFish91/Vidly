const mongoose = require('mongoose');
const Joi = require('joi');

const Customer = mongoose.model('Customer', new mongoose.Schema({
    isGold: { type: Boolean, default: false },
    name: { type: String, minlength: 2, maxlength: 50 },
    phone: { type: String, minlength: 7, maxlength: 15 }
}));

// Validate Input
function validateCustomer(userInput){
    const schema = Joi.object({
        isGold: Joi.bool(),
        name: Joi.string().alphanum().min(2).max(50).required(),
        phone: Joi.string().alphanum().min(7).max(15).required()
    });
    return schema.validate(userInput);
}

exports.Customer = Customer;
exports.validate = validateCustomer;