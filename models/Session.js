const mongoose = require("mongoose");
const SessionSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  files: [{}],
  attendance_date: {
    ComingSoon: {
      type: Boolean,
    },
    starts: {
      type: Date,
    },
    ends: {
      type: Date,
    },
  },
  status: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Session", SessionSchema);
