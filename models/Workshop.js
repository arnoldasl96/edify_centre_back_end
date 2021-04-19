const mongoose = require("mongoose");

const WorkshopSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    ComingSoon: {
      type: Boolean,
      default: false,
    },
    from: {
      type: Date,
    },
    to: {
      type: Date,
    },
  },
  description: {
    type: String,
  },
  files: [{}],
  hours: {
    type: Number,
  },
  price: {
    type: Number,
  },
  short_description: {
    type: String,
  },

  responsible_person: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  sessions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
    },
  ],
  status: {
    type: String,
    required: true,
  },
  students_list: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  Workshop_created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Workshop", WorkshopSchema);
