const express = require('express');
const router = express.Router();
const Joi = require('joi');
const passwordComplexity = require("joi-password-complexity");
const bcrypt = require('bcrypt');
const { User } = require('../models/user');

router.post('/', async(req, res) => {
    const { error } = validateAuth(req.body);
    if (error) {res.status(400).send(error.message); return;};

    let user = await User.findOne({ email: req.body.email });
    if (!user) {res.status(400).send('Invalid email or password.'); return;};

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {res.status(400).send('Invalid email or password.'); return;};

    res.send(true);
});

function validateAuth(userInput){
    const schema = Joi.object({
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

module.exports = router;