const express = require('express');
const axios = require('axios');
const { Recipe, User } = require('../models');

const router = express.Router();

// RETRIEVE RECIPE
router.get('/:id', async (req, res) => {
    try {
        const recipe = await Recipe.findOne({ _id: (req.params.id) }).lean();
        if (!recipe) return res.status(404).send('not found'); // if mixtape doesn't exist
        return res.send(recipe);
    } catch(err) {
        res.status(400).send(err);
    }
});


module.exports = router;