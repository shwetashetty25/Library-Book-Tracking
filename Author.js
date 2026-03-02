const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  name: String,
  biography: String,
  birth_year: Number,
});

module.exports = mongoose.model("Author", authorSchema);