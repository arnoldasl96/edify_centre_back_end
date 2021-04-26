const express = require("express");
const router = express.Router();
const file = require("../models/file");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
router.post("/", upload.single("file"), (req, res, next) => {
  res.json(req.file);
});

router.put("/", (req, res) => {
  const fs = require("fs");
  try {
    fs.unlink(req.body.url);
    res.json({ message: "file deleted" });
  } catch (error) {
    res.json({ message: error });
  }
});
module.exports = router;
