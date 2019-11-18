const express = require('express')
const router = express.Router()

const _ = require('lodash')

const Category = require('../model/category')
const { authenticationUser } = require('../middleware/authentication')

router.get('/', function(req, res) {
  // const { user } = req
  Category.find()
  .then(categories => {
    res.json(categories)
  })
  .catch(err => {
    res.send(err)
  })
})

router.post('/add', function(req, res) {
  const category = new Category(req.body)
  // category.user = user._id
  category.save()
  .then(category => {
    res.json(category)
  })
  .catch(err => {
    res.send(err)
  })
})

router.delete('/remove/:id', function(req, res) {
  // const { user } = req
  const id = req.params.id
  Category.findOneAndDelete({
    _id: id
    })
  .then(category => {
    res.json(category)
  })
  .catch(err => {
    res.send(err)
  })
})

module.exports = router