const express = require("express");
const {
  getAllExpenses,
  createExpense,
  getExpenseById,
  deleteExpenseById,
  updateExpenseById,
} = require("../controllers/expense.controller");

const router = express.Router();

router.get("/expense", getAllExpenses);
router.post("/expense", createExpense);
router.get("/expense/:id", getExpenseById);
router.put("/expense/:id", updateExpenseById);
router.delete("/expense/:id", deleteExpenseById);

module.exports = router;
