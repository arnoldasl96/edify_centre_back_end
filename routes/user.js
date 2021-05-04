const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Workshop = require("../models/Workshop");
const { isAdministrator, isLoggedIn } = require("./VerificationFunctions");

router.get("/", async (req, res) => {
  if (req.query === {}) {
    try {
      const posts = await User.find();
      res.json(posts);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  } else {
    try {
      const posts = await User.find(req.query);
      res.json(posts);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  }
});

//SPECIFIC USER
router.get("/:userId", async (req, res) => {
  try {
    const post = await User.findById(req.params.userId);
    if (post == null) res.status(404).json("not found");
    else res.json(post);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.get("/:userId/workshops", async (req, res) => {
  try {
    User.findById(req.params.userId)
      .populate("purchasedWorkshopsList")
      .exec()
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            message: "Workshops not found",
          });
        }
        res.status(200).json(user.purchasedWorkshopsList);
      });
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

// DELETE 1

router.delete("/:userId", async (req, res) => {
  try {
    const post = await User.findByIdAndDelete({ _id: req.params.userId });
    res.json(post);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});
//UPDATE

router.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const update = req.body;
    const post = await User.findByIdAndUpdate(id, update);
    res.status(204).json({ post });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});
module.exports = router;
