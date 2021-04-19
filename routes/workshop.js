const router = require("express").Router();
const Workshop = require("../models/Workshop");
const Session = require("../models/Session");
const User = require("../models/User");

router.get("/", async (req, res) => {
  try {
    const workshop = await Workshop.find();
    res.json(workshop);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const workshop = await Workshop.findById(req.params.id);

    res.json(workshop);
  } catch (err) {
    res.json({ message: err });
  }
});
router.post("/", async (req, res) => {
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
    status: req.body.status,
  });
  try {
    const savedWorkshop = await NewWorkshop.save();
    res.json({ WorkshopId: savedWorkshop._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:id/info", async (req, res) => {
  try {
    const workshop = await Workshop.findById(req.params.id);
    if (!workshop) {
      return res.status(400).json("workshop not found");
    }
    const response = {
      workshop: {
        files: workshop.files,
        date: workshop.date,
        _id: workshop._id,
        title: workshop.title,
        description: workshop.description,
        hours: workshop.hours,
        category: workshop.category,
        price: workshop.price,
        short_description: workshop.short_description,
        students_list: workshop.students_list,
        responsible_person: workshop.responsible_person,
        status: workshop.status,
        sessions: workshop.sessions,
      },
      sessions: [],
      students_list: [],
      responsible_person: [],
    };

    for (let i = 0; i < workshop.sessions.length; i++) {
      const item = workshop.sessions[i];
      const session = await Session.findById(item);
      response.sessions.push(session);
    }

    for (let i = 0; i < workshop.students_list.length; i++) {
      const item = workshop.students_list[i];
      if (item.id != null) {
        const student = await User.findById(item);
        response.students_list.push({
          photo: student.photo,
          firstname: student.firstname,
          lastname: student.lastname,
          email: student.email,
          _id: student._id,
        });
      }
    }

    for (let i = 0; i < workshop.responsible_person.length; i++) {
      const item = workshop.responsible_person[i];
      const trainer = await User.findById(item);
      response.responsible_person.push({
        photo: trainer.photo,
        firstname: trainer.firstname,
        lastname: trainer.lastname,
        email: trainer.email,
        _id: trainer._id,
      });
    }

    res.json(response);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const update = req.body;
    const post = await Workshop.findByIdAndUpdate({ _id: id }, update);
    res.status(204).json(post);
  } catch (err) {
    res.json({ message: err });
  }
});
router.patch("/:id/sessions", async (req, res) => {
  try {
    const id = req.params.id;
    const update = req.body.sessionId;
    const post = await Workshop.findByIdAndUpdate(
      { _id: id },
      { $push: { sessions: update } }
    );
    res.status(204).json(post);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/:id/session/:sessionId", async (req, res) => {
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
    res.json({ workshop: workshop, session: session });
  } catch (error) {
    req.json({ message: error });
  }
});

module.exports = router;
