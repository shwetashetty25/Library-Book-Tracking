const mongoose = require("mongoose");

const fineSchema = new mongoose.Schema({
  patron_id: { type: mongoose.Schema.Types.ObjectId, ref: "Patron" },
  amount: Number,
  reason: String,
  paid_date: Date,
});

module.exports = mongoose.model("Fine", fineSchema);