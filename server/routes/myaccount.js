const express = require('express');
const router = express.Router();
const { User } = require('../models');

router.get('/', async (req, res) => {
    const email = req.user.email;
    console.log("req.user: ", req.user);
    //let recipes = await Recipe.find({ "owner": email }).lean();

    //res.send(recipes);
});

module.exports = router;