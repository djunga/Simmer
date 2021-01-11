const express = require('express');
const passport = require('passport');
const crypto = require('crypto');
const { User } = require('../models');

const router = express.Router();

const CLIENT_ROOT_URL = process.env.CLIENT_ROOT_URL || 'http://localhost:3000';

router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    // this new user should be an admin if there are 0 users currently
    const userCount = await User.estimatedDocumentCount();
    // generate email verification token
    const token = crypto.randomBytes(64).toString('hex');
    // before, it was verified: userCount === 0 but we made it true. Everyone is automatically verified.
    User.register(new User({ email, token, verified: true, admin: userCount === 0, local: true }), password, async (err, user) => {
        if (err) return res.status(500).send(err); // TODO: error handling
//         if (process.env.NODE_ENV === 'production') { // only send email in production deployment (i.e. heroku)
            try {
                //await sendVerificationEmail(email, token);
                console.log("verification email with the token would have been sent out here.");
            } catch(err) {
                console.log(err); // TODO: error handling    
            }
//         }
        let responsePayload;
        // send back full user object if running in development.
        // otherwise don't, due to security
        if (process.env.NODE_ENV === 'production') {
            responsePayload = 'signup successful';
        } else {
            responsePayload = user;
        }
        passport.authenticate('local')(req, res, () => res.send(responsePayload));
    });
});

router.post('/login', passport.authenticate('local'), async (req, res) => {
    const { verified } = req.user;
    if (!verified) {
        return res.status(400).send('user not verified.');
    }
    res.send('logged in');
});

router.post('/logout', (req, res) => {
    req.logout(); // passport method to clear jwt from user's cookie
    res.send('logged out.');
});

router.put('/verify', async (req, res) => {
    try {
        res.send('user verified');
    } catch (err) {
        res.status(500).send(err)
    }
});

router.get('/login/success', async (req, res) => {
    if (!req.user) return res.status(401).send('unauthorized');
    if(req.user) {
        console.log('user: ' + req.user);
    }
    else {
        console.log("No user");
    }

    const { email, uniqueId, _id, admin, createdAt, updatedAt, verified, strategy } = req.user;
    if (!verified) {
        return res.status(400).send('user not verified.');
    }

    res.json({
        _id,
        uniqueId, // convert number to base36 to get alphanumeric id
        admin,
        createdAt,
        updatedAt,
        strategy,
    });
});

module.exports = router;