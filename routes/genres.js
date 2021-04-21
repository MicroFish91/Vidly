const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Joi = require('joi');

const Video = mongoose.model('Video', new mongoose.Schema({
    name: { type: String, 
        required: true,
        minlength: 4,
        maxlength: 30
    }
}));

// Display All Genres
router.get('/', async (req, res) => {
    const videos = await Video.find().sort('name');
    res.send(videos);
});

// Display a Specific ID
router.get('/:id', async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        res.send(video);
    }
    catch(e) {
        res.status(404).send("The genre with the given ID was not found.");
    }    
});

// Post a Genre
router.post('/', async (req, res) => {

    // Validate
    const { error } = validateInput(req.body);  // error = req.body.error
    // If invalid, return 400 error message
    if (error) res.status(400).send(error.message);

    const video = new Video({
        name: req.body.name
    });

    const result = await video.save();
    res.send(result);
});

// Update a Specific Genre
router.put('/:id', async (req, res) => {
    
    // Validate
    const { error } = validateInput(req.body);  // error = req.body.error
    // If invalid, return 400 error message
    if (error) res.status(400).send(error.message);

    // Update the course
    try {
        const video = await Video.findByIdAndUpdate({ _id: req.params.id }, {
            $set: {
                name: req.body.name
            }
        }, {new: true});
        res.send(video);
    }
    // If course does not exist, display 404 error message
    catch(e){
        res.status(404).send("The genre with the given ID was not found.");
    }

});

// Delete an ID
router.delete('/:id', async (req, res) => {
    try {
        const result = await Video.deleteOne({ _id: req.params.id });
        res.send(result);
    }
    catch(e){
        res.status(404).send("The genre with the given ID was not found.");
    }
});

// Validate Input
function validateInput(userInput){
    const schema = Joi.object({
        name: Joi.string().alphanum().min(4).max(25).required()
    });
    return schema.validate(userInput);
}

module.exports = router;