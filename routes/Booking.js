const router = require("express").Router();
const User = require("../models/User");
const Workshop = require("../models/Workshop");
const Booking = require("../models/WorkshopBooking");
const { isLoggedIn, isAdministrator } = require("./VerificationFunctions");

router.get("/request", isAdministrator, async (req, res) => {
Booking.find()
.populate('workshop', 'title')
.populate('user', 'firstname lastname email')
.exec()
.then(booking => {
 res.status(200).json({booking:booking})
})
});

router.get("/request/:id", async (req, res) => {
    const booking = await Booking.findById(req.params.id);
    if(!booking) return res.status(404).json({message:" not found"});
    res.status(200).json({booking});

});

router.post("/request", isLoggedIn, async (req, res) => {
  const BookingExists = await Booking.findOne({
    workshop: req.body.workshop,
    user: req.body.user,
  });
  if (BookingExists) {
    return res.json({ message: "you have already booked this workshop!" });
  }
  const newBooking = new Booking({
    workshop: req.body.workshop,
    user: req.body.user,
  });
  try {
    const SavedBooking = await newBooking.save();
    res.json({
      message: "succesfully booked!",
      bookingNumber: SavedBooking._id,
    });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

router.patch("/request", isAdministrator, async (req, res) => {
  if (req.body.status === "declined") {
    const declinedBooking = await Booking.findByIdAndUpdate(
      { _id: req.body.data._id },
      {
        $set: {
          status: req.body.status,
        },
      }
    );
  return  res.status(203).json({declinedBooking});
  }
  if (req.body.status === "accepted") {
    await Booking.findByIdAndUpdate(
      { _id: req.body.data._id },
      {
        $set: {
          status: req.body.status,
        },
      }
    );
    await User.findByIdAndUpdate(
      { _id: req.body.data.user._id },
      {
        $push: {
          purchasedWorkshopsList: req.body.data.workshop._id,
        },
      }
    );
    await Workshop.findByIdAndUpdate(
      { _id: req.body.data.workshop._id },
      {
        $push: {
          students_list: req.body.data.user._id,
        },
      }
    );
  return res.status(203).json({message:"updated"});
  }
  res.status(400).json({error:"status code not found"})
});

module.exports = router;
