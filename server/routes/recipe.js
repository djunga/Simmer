const express = require('express');
const axios = require('axios');
const { Recipe, User } = require('../models');

const router = express.Router();

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


module.exports = router;