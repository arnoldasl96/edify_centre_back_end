const mongoose = require("mongoose");

const FileSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("File", FileSchema);
