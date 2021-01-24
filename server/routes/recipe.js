const express = require('express');
const seedrandom = require('seedrandom');
const { Recipe } = require('../models');

const router = express.Router();
const PAGINATION_COUNT = 10;

/**
 * Fisher-Yates algorithm for shuffling arrays
 */
function getRandomSubarray(arr, size, seed) {
    const shuffled = [...arr];
    let i = arr.length;
    let temp;
    let index;
    while (i--) {
        if (seed) {
            index = Math.floor((i + 1) * seed);    
        } else {
            index = Math.floor((i + 1) * Math.random());
        }
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    const rr = shuffled.slice(0, size);
    //console.log("rr: ", rr);
    return rr;
}

router.get('/random', async (req, res) => {
    const { count } = req.query;
    const recipes = await Recipe.find({}).lean();
    //console.log("recipes in random: ", recipes.length);
    const date = new Date(); 
    // use an rng seed that will be unique to the logged in user AND change once per day:
    const rng = seedrandom(`${req.user._id}_${date.getMonth()}/${date.getDay()}/${date.getFullYear()}`);
    //console.log("req.user._id: ", req.user._id)
    return res.send(getRandomSubarray(recipes, count, rng()));
});


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

// DELETE RECIPE
router.delete('/:id', async (req, res) => {
    const recipe = await Recipe.findOne({ _id: req.params.id }).lean();
    await Recipe.deleteOne({  _id: recipe._id });
    return res.send(recipe);
});

module.exports = router;