const Expense = require("../models/expense.model");

const getAllExpenses = async (req, res) => {
  try {
    const data = await Expense.find({});
    if (!data || data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No expenses found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Expenses found",
      data: data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const createExpense = async (req, res) => {
  try {
    const { amount, description, category, date } = req.body;
    if (!amount || !category || category.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Amount and category are required",
      });
    }
    const expense = new Expense({ amount, description, category, date });
    await expense.save();
    res.status(201).json({
      success: true,
      message: "Expense created successfully",
      data: expense,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const getExpenseById = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findById(id);
    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Expense found",
      data: expense,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const deleteExpenseById = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findByIdAndDelete(id);
    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Expense deleted successfully",
      data: expense,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};


const updateExpenseById = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, description, category, date } = req.body;

    const updateFields = {};
    if (amount !== undefined) updateFields.amount = amount;
    if (description !== undefined) updateFields.description = description;
    if (category !== undefined) updateFields.category = category;
    if (date !== undefined) updateFields.date = date;

    const expense = await Expense.findByIdAndUpdate(id, updateFields, {
      new: true,
      runValidators: true,
    });

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Expense updated successfully",
      data: expense,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports = {
  getAllExpenses,
  createExpense,
  getExpenseById,
  deleteExpenseById,
  updateExpenseById,
};
