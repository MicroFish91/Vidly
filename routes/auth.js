const express = require('express');
const router = express.Router();
const Joi = require('joi');
const passwordComplexity = require("joi-password-complexity");
const bcrypt = require('bcrypt');
const { User } = require('../models/user');

router.post('/', async(req, res) => {
    const { error } = validateAuth(req.body);
    if (error) return res.status(400).send(error.message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password.');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password.');

    // jwt format: { header: {} , payload: {}, dig. signature: {} }
    // pass payload format into jwt.sign(payload, secret)
    const token = user.generateAuthToken();
    res.send(token);
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