const router = require("express").Router();
const User = require("../models/User");
const Workshop = require("../models/Workshop");
const Booking = require("../models/WorkshopBooking");
const { FormatDate } = require("./VerificationFunctions");

router.get("/request", async (req, res) => {
Booking.find()
.populate('workshop', 'title')
.populate('user', 'firstname lastname email')
.exec()
.then(booking => {
 res.status(200).json({booking:booking})
})
});

router.get("/request/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (booking == null)
      res.status(404).json({ message: "booking with this id not found" });
    res.json(booking);
  } catch (error) {
    res.json({ message: error });
  }
});

router.post("/request", async (req, res) => {
  console.log(req.body);

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

router.patch("/request", async (req, res) => {
  if (req.body.status === "declined") {
    const declinedBooking = await Booking.updateOne(
      { _id: req.body.data._id },
      {
        $set: {
          status: req.body.status,
        },
      }
    );
    res.json(declinedBooking);
  }
  if (req.body.status === "accepted") {
    await Booking.updateOne(
      { _id: req.body.data._id },
      {
        $set: {
          status: req.body.status,
        },
      }
    );
    await User.updateOne(
      { _id: req.body.data.user.id },
      {
        $push: {
          purchasedWorkshopsList: {
            workshop: req.body.data.workshop.id,
          },
        },
      }
    );
    await Workshop.updateOne(
      { _id: req.body.data.workshop.id },
      {
        $push: {
          students_list: req.body.data.user.id,
        },
      }
    );
    res.json("updated");
  }
});

module.exports = router;
