const router = require("express").Router();
const Workshop = require("../models/Workshop");
const Session = require("../models/Session");
const User = require("../models/User");
const { isLoggedIn, isAdministrator } = require("./VerificationFunctions");

router.get("/", isLoggedIn, async (req, res) => {
  try {
    const workshop = await Workshop.find();
    res.json(workshop);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/:id", isLoggedIn, async (req, res) => {
  try {
    const workshop = await Workshop.findById(req.params.id);

    res.json(workshop);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});
router.post("/", isAdministrator, async (req, res) => {
  const NewWorkshop = new Workshop({
    title: req.body.title,
    description: req.body.description,
    files: req.body.files,
    date: req.body.date,
    responsible_person: req.body.responsible_person,
    status: req.body.status,
    category: req.body.category,
    hours: req.body.hours,
    price: req.body.price,
    short_description: req.body.short_description,
    sessions: req.body.sessions,
  });
  try {
    const savedWorkshop = await NewWorkshop.save();
    res.status(201).json({ WorkshopId: savedWorkshop._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.patch("/:id", isAdministrator, async (req, res) => {
  try {
    const id = req.params.id;
    const update = req.body;
    const post = await Workshop.findByIdAndUpdate({ _id: id }, update);
    res.status(204).json(post);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});
router.patch("/:id/sessions", isAdministrator, async (req, res) => {
  try {
    const id = req.params.id;
    const update = req.body.sessionId;
    const post = await Workshop.findByIdAndUpdate(
      { _id: id },
      { $push: { sessions: update } }
    );
    res.status(204).json(post);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.patch("/:id/session/:sessionId", isAdministrator, async (req, res) => {
  try {
    const session = await Session.findByIdAndDelete({
      _id: req.params.sessionId,
    });
    const workshop = await Workshop.findOneAndUpdate(
      { _id: req.params.id },
      {
        $pull: {
          sessions: req.params.sessionId,
        },
      }
    );
    res.status(204).json({ workshop: workshop, session: session });
  } catch (error) {
    req.status(400).json({ message: error });
  }
});
router.get("/:id/info", isLoggedIn, async (req, res) => {
  Workshop.findById(req.params.id)
    .populate("sessions")
    .populate("responsible_person", "firstname lastname email _id photo")
    .populate("students_list", "firstname lastname email _id photo")
    .exec()
    .then((workshop) => {
      if (!workshop) {
        return res.status(404).json({
          message: "Workshop not found",
        });
      }
      res.status(200).json({ workshop: workshop });
    });
});

module.exports = router;
