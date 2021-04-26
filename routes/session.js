const express = require('express');
const router = express.Router();
const Session = require('../models/Session')

router.post('/', async(req, res) => {
    const NewSession = new Session({
        title: req.body.title,
        description: req.body.description,
        files: req.body.files,
        attendance_date: req.body.attendance_date,
        teachers: req.body.teachers,
        status: req.body.status
    })
    try {
        const savedSession = await NewSession.save();
        res.status(201).json({ message: "success", SessionId: savedSession._id });
    } catch (error) {
        res.status(400).json({message: error});
    }
})
router.delete('/:id', async(req,res)=>{
    try {
        
    const deletedSession = await Session.findByIdAndDelete({_id: req.params.id});
    res.json({deleted: deletedSession})
    } catch (error) {
        res.status(400).json({message: error})
    }
})
router.patch('/:id', async(req,res)=>{
    try {
        const id = req.params.id;
        const update= req.body;
        const post = await Session.findByIdAndUpdate({_id:id},update);
        res.status(204).json({ session:post});

    } catch (err) {
        res.status(400).json({ message: err });
    }

})
module.exports = router;