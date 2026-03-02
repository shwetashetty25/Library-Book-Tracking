const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  isbn: String,
  title: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "Author" },
  publisher: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  total_copies: Number,
  available: Number,
});

module.exports = mongoose.model("Book", bookSchema);