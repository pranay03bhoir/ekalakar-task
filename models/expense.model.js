const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  amount: { type: String, required: true },
  description: { type: String, default: "" },
  category: [{ type: String, required: true }],
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Expense", expenseSchema);
