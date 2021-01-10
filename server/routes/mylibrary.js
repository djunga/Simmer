const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    if (!req.user) {
        return res.status(401).send('unauthorized');
    }
    res.send('mylibrary');
});

module.exports = router;