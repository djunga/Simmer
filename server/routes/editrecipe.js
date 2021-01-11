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
        ingredient: [],
        instructions: [],
        tags: []
    });
    
    await recipe.save();
    return res.send(recipe._id);
});

router.put('/:id/photo', async (req, res) => {
    if (!req.files || !req.files.photo) return res.status(400).send('no file uploaded.');
    const { photo } = req.files;
    await Recipe.findByIdAndUpdate(req.params.id, { photo: { data: photo.data, contentType: photo.mimetype } });
    const recipe = await Recipe.findById(req.params.id).lean();
    res.send(recipe);
});


router.get('/:id/photo', async (req, res) => {
    const recipe = await Recipe.findById(req.params.id).select('+photo').lean();
    if (recipe && recipe.photo) {
        res.set('Content-Type', mixtape.coverImage.contentType);
        res.send(recipe.photo.data.buffer);
    } else if (recipe) {
        const image = await textToPicture.convert({
            text: recipe.title,
            size: 32,
            quality: 100,
            source: {
                height: 256,
                width: 256,
                background: 0xFFFFFFFF,
            },
        });
        const buf = await image.getBuffer()
        res.send(buf);
    } else {
        res.status(404).send('recipe not found');
    }
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