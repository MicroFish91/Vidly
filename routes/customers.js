const express = require('express');
const router = express.Router();
const { Customer, validate } = require('../models/customer');

// Get Customer
router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

// Get Specific ID
router.get('/:id', async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        res.send(customer);
    }
    catch(e) {
        res.status(404).send("Customer with the given ID was not found.");
    }
});


// Create Customer
router.post('/', async(req, res) => {

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.message);

    const customer = new Customer({
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone
    });

    const result = await customer.save();
    res.send(result);
});


// Delete Customer
router.delete('/:id', async(req, res) => {
    try {
        const result = await Customer.findOneAndDelete(req.params.id);
        res.send(result);
    }
    catch(e) {
        res.status(404).send("Customer with the given ID was not found.");
    }
});

module.exports = router;