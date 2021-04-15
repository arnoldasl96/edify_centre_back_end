const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    required: false,
    default: "1900-01-01"
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  account_created: {
    type: Date,
    default: Date.now,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  photo: {
    type: String,
    default: "http://localhost:4000/uploads/default-man.jpg",
  },
  biography: {
    type: String,
  },
  phone: {
    type: String,
  },
  purchasedWorkshopsList: [
    {
      workshopId: {
        type: String,
        required: true,
      },
      purchasedDate: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
