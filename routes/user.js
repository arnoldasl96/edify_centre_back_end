const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { isAdministrator, isLoggedIn } = require('./VerificationFunctions');

router.get('/', isAdministrator, (req, res) => {
        try {
            const posts = await User.find();
            res.json(posts);
        } catch (err) {
            res.json({ message: err })
        }
    })
    //SPECIFIC USER
router.get('/:userId', async(req, res) => {
    try {
        const post = await User.findById(req.params.userId);
        if (post == null) res.status(400).json("not found");
        else res.json(post);
    } catch (err) {
        res.json({ message: err });
    }
})

// DELETE 1

router.delete('/:userId', isAdministrator, async(req, res) => {
        try {
            const post = await User.remove({ _id: req.params.userId });
            res.json(post);

        } catch (err) {
            res.json({ message: err });
        }

    })
    //UPDATE

router.patch('/:userId', (isAdministrator || isLoggedIn), async(req, res) => {
    try {
        const post = await User.updateOne({ _id: req.params.userId }, { $set: { name: req.body.name, email: req.body.email, password: req.body.password } });
        res.json(post);

    } catch (err) {
        res.json({ message: err });
    }

})