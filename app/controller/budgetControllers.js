const express = require('express')
const router = express.Router()

const _ = require('lodash')

const Budget = require('../model/budget')
const { authenticationUser } = require('../middleware/authentication')

router.get('/', function(req, res) {
  // const {user} = req
  Budget.find()
    .then(function(budgets) {
      res.json(budgets)
    })
    .catch(function(err) {
      res.send(err)
    })
})

router.post('/add', function(req, res) {
  // const {user} = req
  const budget = new Budget(req.body)
  // budget.user = user._id
  budget.save()
  .then(budget => {
    res.json(budget)
  })
  .catch(err => {
    res.send(err)
  })
})

router.get('/:id', function(req, res) {
  const id = req.params.id
  // const {user} = req
  Budget.findOne({
    _id: id
  })
  .then(budget => {
    res.json(budget)
  })
  .catch(err => {
    res.send(err)
  })
})

router.put('/edit/:id', function(req, res) {
  const id = req.params.id
  const body = req.body
  Budget.findOneAndUpdate({
    _id: id
  },{$set: body}, {new: true})
  .then(budget => {
    res.json(budget)
  })
  .catch(err => {
    res.send(err)
  })
})

router.delete('/remove/:id', function(req, res) {
  const id = req.params.id
  Budget.findOneAndDelete({
    _id: id
  })
  .then(budget => {
    res.json(budget)
  })
  .catch(err => {
    res.send(err)
  })
})

module.exports = router

