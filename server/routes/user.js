const express = require('express');
const { User } = require('../models');
const router = express.Router();

// // Get info about any user. Exclude sensitive fields since this is public.
// router.get('/:id', async (req, res) => {
//     if (req.params.id.length === 5 && req.params.id.charAt(0) === '!') { // search by uniqueId
//         const user = await User.findOne({ uniqueId: parseInt(req.params.id.substring(1), 36) }).select('-email -admin -verified -token').lean();
//         res.send(user);
//     } else { // search by _id
//         const user = await User.findById(req.params.id).select('-email -admin -verified -token').lean();
//         res.send(user);
//     }
// });


module.exports = router;
