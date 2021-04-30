const mongoose = require('mongoose');
const Joi = require('joi');


const Rental = mongoose.model('Rentals', new mongoose.Schema({
    customer: { 
        type: new mongoose.Schema({
            name: { type: String, minlength: 4, maxlength: 50, required: true },
            isGold: { type: Boolean, default: false },
            phone: { type: String, minlength: 7, maxlength: 15, required: true }
        }),
        required: true    
    },
    movie: {
        type: new mongoose.Schema({
            title: { type: String, minlength: 2, maxlength: 50, require: true },
            dailyRentalRate: { type: Number, min: 0, max: 100, required: true }
        }),
        required: true        
    },
    dateOut: { type: Date, default: Date.now, required: true },
    dateReturned: { type: Date },
    rentalFee: { type: Number, min: 0 }
}));


function validateRental(userInput){
    const schema = Joi.object({
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    });
    return schema.validate(userInput);
}

exports.validate = validateRental;
exports.Rental = Rental;