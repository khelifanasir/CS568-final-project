const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const carSchema = new Schema({
  model: { type: String, required: true },
  make: { type: String, required: true },
  year: { type: String },
  description: { type: String },
  image: { type: String, required: true },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Car", carSchema);
