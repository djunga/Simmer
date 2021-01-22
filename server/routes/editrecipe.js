const express = require('express');
const axios = require('axios');
const { Recipe, User } = require('../models');

const router = express.Router();


/**
 * Create a Recipe
 */
router.post('/', async (req, res) => {
    if (!req.user) {
        return res.status(401).send('unauthorized');
    }
    const recipe = new Recipe({
        // Where will these attributes come from? See line 29 in the loginpage file in the accompal project
        // To find out.
        owner: req.user.email,
        title: req.title,
        dateCreated: req.dateCreated,
        servings: req.servings,
        prepTime: req.prepTime,
        cookTime: req.cookTime,
        // skip photo
        ingredients: [],
        instructions: [],
        tags: []
    });
    
    await recipe.save();
    return res.send(recipe._id);
});

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

// UPDATE RECIPE
router.put('/:id', async (req, res) => {
    const { recipe } = req.body;
    await Recipe.findOneAndUpdate({  _id: recipe._id }, recipe);
    return res.send(recipe);
});

module.exports = router;