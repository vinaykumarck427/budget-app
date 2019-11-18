const mongoose = require('mongoose')

const Schema = mongoose.Schema

const budgetSchema = new Schema({
  budget: {
    type: Number
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

const Budget = mongoose.model('Budget', budgetSchema)

module.exports = Budget