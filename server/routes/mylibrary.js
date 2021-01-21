const express = require('express');
const router = express.Router();
const { Recipe } = require('../models');

// get recipes owned by a certain user
router.get('/', async (req, res) => {
    const email = req.user.email;
    let recipes = await Recipe.find({ "owner": email }).lean();

    res.send(recipes);
});

module.exports = router;