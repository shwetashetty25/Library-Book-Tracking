const mongoose = require("mongoose");

const patronSchema = new mongoose.Schema({
  name: String,
  email: String,
  membership_date: Date,
  membership_type: String,
});

module.exports = mongoose.model("Patron", patronSchema);