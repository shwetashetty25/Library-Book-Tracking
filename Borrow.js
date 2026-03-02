const mongoose = require("mongoose");

const borrowSchema = new mongoose.Schema({
  book_id: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
  patron_id: { type: mongoose.Schema.Types.ObjectId, ref: "Patron" },
  borrow_date: Date,
  due_date: Date,
  return_date: Date,
  status: String,
});

module.exports = mongoose.model("Borrow", borrowSchema);