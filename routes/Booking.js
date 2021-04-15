const router = require('express').Router();
const User = require('../models/User')
const Workshop = require('../models/Workshop')
const Booking = require('../models/WorkshopBooking');
const { FormatDate } = require('./VerificationFunctions');

router.get('/request', async(req, res) => {
    try {
        const booking = await Booking.find();
        if (booking == null) res.status(404).json({ message: " bookings not found" });
        var response = [];
        for (let id in booking) {
            const element = booking[id];
            const data = {
                _id: element._id,
                student: null,
                workshop: null,
                info: null,
            }
            const workshop = await Workshop.findById(element.workshopId)
        if (workshop == null) res.status(404).json({ message: " workshop with this id not found" });
            
            const student = await User.findById(element.userId)
        if (student == null) res.status(404).json({ message: " student with this id not found" });

            data.workshop = {
                id: workshop._id,
                title: workshop.title,
            }
            data.student = {
                id: student._id,
                fullName: student.firstname + " " + student.lastname,
                email: student.email,
            }
            data.info = {
                status: element.status,
                request_send: FormatDate(element.request_send)
            }
            response.push(data);
        }
        res.json(response)

    } catch (error) {
        res.json({ message: error })
    }
})



router.get('/request/:id', async(req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (booking == null) res.status(404).json({ message: "booking with this id not found" });
        res.json(booking)

    } catch (error) {
        res.json({ message: error })
    }
})

router.post('/request', async(req, res) => {

    const BookingExists = await Booking.findOne({ workshopId: req.body.workshopId, userId: req.body.userId, status: 'pending' });
    if (BookingExists) {
        return res.json({ message: 'you have already booked this workshop!' })
    }
    const newBooking = new Booking({
        workshopId: req.body.workshopId,
        userId: req.body.userId,
        status: req.body.status,
    })
    try {
        const SavedBooking = await newBooking.save();
        res.json({ message: "succesfully booked!", bookingNumber: SavedBooking._id })
    } catch (error) {
        res.status(400).json({ error: error })
    }
})

router.patch('/request', async(req, res) => {
    if (req.body.status === 'declined') {
        const declinedBooking = await Booking.updateOne({ _id: req.body.data._id }, {
            $set: {
                status: req.body.status,
            }
        })
        res.json(declinedBooking)
    }
    if (req.body.status === 'accepted') {
        await Booking.updateOne({ _id: req.body.data._id }, {
            $set: {
                status: req.body.status,
            }
        })
        await User.updateOne({ _id: req.body.data.student.id }, {
            $push: {
                purchasedWorkshopsList: {
                    workshopId: req.body.data.workshop.id,
                },
            }
        })
        await Workshop.updateOne({ _id: req.body.data.workshop.id }, {
            $push: {
                students_list: req.body.data.student.id,
            }
        })
        res.json('updated')
    }

})

module.exports = router;