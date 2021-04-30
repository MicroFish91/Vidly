const express = require('express');
const router = express.Router();
const { validate, User } = require('../models/user');

// Post a user
router.post('/', async(req, res) => {
    const { error } = validate(req.body);
    if (!error) {res.status(400).send(error.message); return;};

    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {res.status(400).send('User already registered.'); return;};

        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        user = await user.save();
        res.send(user);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});

module.exports = router;