const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

router.get('/', async(req, res) => {
    try {
        const course = await Course.find();
        res.json(course);
    } catch (err) {
        res.json({ message: err })
    }
})

router.get('/:courseid', async(req, res) => {
    try {
        const course = await Course.findById(req.params.courseid);
        if (course == null) res.status(400).json("not found");
        else res.json(course);
    } catch (err) {
        res.json({ message: err })
    }
})

router.delete('/:courseid', async(req, res) => {
    try {
        const post = await User.remove({ _id: req.params.courseid });
        if (course == null) res.status(400).json('course could not be found');
        else res.json(post);
    } catch (err) {
        res.json({ message: err });
    }

})

router.patch('/:courseid', async(req, res) => {
    try {
        const post = await course.updateOne({ _id: req.params.courseid }, {
            $set: {

            }
        });
        if (course == null) res.status(400).json('course could not be found');
        else res.json(post);
    } catch (err) {
        res.json({ message: err });
    }

})