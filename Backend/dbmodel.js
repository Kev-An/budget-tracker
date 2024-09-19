const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    default: 0,
  },
  max: {
    type: Number,
    required: true,
  },
});

const budgetModel = mongoose.model("Budgets", budgetSchema);
module.exports = budgetModel;
