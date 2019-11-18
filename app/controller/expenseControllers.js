const express = require('express')
const router = express.Router()

const Expense = require('../model/expense')
const { authenticationUser } = require('../middleware/authentication')

router.get('/', function(req, res) {
  const { user } = req
  Expense.find({
    user: user._id
  }.populate('category', ['category']))
  .then(expense => {
    res.json(expense)
  })
  .catch(err => {
    res.send(err)
  })
})

router.post('/add', function(req, res) {
  const { user } = req
  const expense = new Expense(req.body)
  expense.user = user._id
  expense.save()
  .then(expense => {
    res.json(expense)
  })
  .catch(err => {
    res.send(err)
  })
})

router.put('/edit/:id', function(req, res) {
  const { user } = req
  const id = req.params.id
  Expense.findOneAndUpdate({
    _id: id,
    user: user._id
  }, {$set: req.body}, {new: true})
  .then(expense => {
    res.json(expense)
  })
  .catch(err => {
    res.send(err)
  })
})

module.exports= router