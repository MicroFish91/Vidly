const express = require('express');
const Fawn = require('fawn');
const router = express.Router();
const { Movie } = require('../models/movies');
const { Customer } = require('../models/customer');
const { validate, Rental } = require('../models/rental');

// Post a Rental
router.post('/', async(req, res) => {

    const { error } = validate(req.body);
    if (error) { res.status(400).send(error.message); return; }

    try {
        const movie = await Movie.findById(req.body.movieId);
        const customer = await Customer.findById(req.body.customerId);

        const rental = new Rental({
            customer: {
                _id: req.body.customerId,
                name: customer.name,
                isGold: customer.isGold,
                phone: customer.phone
            },
            movie: {
                _id: req.body.movieId,
                title: movie.title,
                dailyRentalRate: movie.dailyRentalRate
            }
        });

        // Return error if movie out of stock
        if (movie.numberInStock === 0) { res.status(400).send("Out of stock."); return; }

        movie.numberInStock--;

        // Replace transaction with Fawn
        // rental = await rental.save();
        // movie.save();

        new Fawn.Task()
            .save('rentals', rental)
            .update('movies', { _id: movie._id }, {
                $inc: { numberInStock: -1 }
            })
            .run();

        res.send(rental);
    }
    catch(e) {
        res.status(400).send(e.message);
    }
});

module.exports = router;