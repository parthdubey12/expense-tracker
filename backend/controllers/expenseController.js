import Expense from '../models/Expense.js';

export const getExpenses = async (req, res) => {
  try {
    const transactionLedger = await Expense.find({ user: req.user.id }).sort({ date: -1 });
    res.json(transactionLedger);
  } catch (err) {
    res.status(500).json({ message: 'Failed to access remote ledger node instances' });
  }
};

export const addExpense = async (req, res) => {
  try {
    const { amount, category, description, date } = req.body;
    if (!amount || !category) {
      return res.status(400).json({ message: 'Validation payload error: missing ledger core parameters' });
    }

    const newRecordNode = await Expense.create({
      user: req.user.id,
      amount,
      category,
      description,
      date: date || Date.now()
    });
    res.status(201).json(newRecordNode);
  } catch (err) {
    res.status(500).json({ message: 'Transaction injection module pipeline failure' });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const targetRecord = await Expense.findById(req.params.id);
    if (!targetRecord) return res.status(404).json({ message: 'Target instance object reference not identified' });
    
    if (targetRecord.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Privilege validation level violation error' });
    }

    await targetRecord.deleteOne();
    res.json({ message: 'Record completely purged from live ledger nodes', id: req.params.id });
  } catch (err) {
    res.status(500).json({ message: 'Purge operation command vector failed' });
  }
};