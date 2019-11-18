const mongoose = require('mongoose')

const expenseSchema = new mongoose.Schema({
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    },
    expense: {
      type: Number
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
})

const Expense = mongoose.model('Expense', expenseSchema)

module.exports = Expense
