const express = require("express");
const budgetModel = require("./dbmodel.js");
const cors = require("cors");
const router = express.Router();

router.use(cors());
router.use(express.json());

// GET REQUEST
router.get("/budgets", async (req, res) => {
  try {
    const budgets = await budgetModel.find({});
    if (!budgets) {
      res.status(400).send({ message: "No budget found" });
    } else {
      res.status(200).send(budgets);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server error" });
  }
});

// POST REQUEST
router.post("/budgets", async (req, res) => {
  try {
    const { name, amount, max } = req.body;
    const newBudget = {
      name: name,
      amount: amount,
      max: max,
    };
    const budget = await budgetModel.create(newBudget);
    return res.status(200).send(budget);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server error" });
  }
});

// DELETE REQUEST
router.delete("/budgets/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await budgetModel.findByIdAndDelete(id);
    res.json({ message: 'Budget deleted' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server error" });
  }
});

// PUT REQUEST
router.put("/budgets/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, amount, max } = req.body;
    const updatedBudget = await budgetModel.findByIdAndUpdate(id, { name, amount, max }, { new: true });
    res.json(updatedBudget);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server error" });
  }
});

module.exports = router;
