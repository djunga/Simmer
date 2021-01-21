const express = require('express');
const { Recipe } = require('../models');

const router = express.Router();
const PAGINATION_COUNT = 10;

router.get('/search', async (req, res) => {
    const { query, page } = req.query;
    if (!query) return res.status(400).send('missing search query');

    const results = await Recipe.paginate({ ...Recipe.searchBuilder(query) }, { lean: true, limit: PAGINATION_COUNT, page: page ? page : 1 });    res.send({
        results: results.docs,
        currentPage: results.page,
        totalPages: results.totalPages,
        totalResults: results.totalDocs,
    });
});

// // get recipes owned by a certain user
// router.get('/createdRecipes', async (req, res) => {
//     const { userId } = req.query;
//     let recipes = await Recipe.find({ 'owner': Types.ObjectId(userId)}).lean();

//     res.send(recipes);
// });

// RETRIEVE RECIPE
router.get('/:id', async (req, res) => {
    try {
        const recipe = await Recipe.findOne({ _id: (req.params.id) }).lean();
        if (!recipe) return res.status(404).send('not found'); // if recipe doesn't exist
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