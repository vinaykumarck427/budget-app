const mongoose = require('mongoose')
mongoose.Promise = global.Promise


mongoose.connect('mongodb://localhost:27017/budget-app', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
  .then(() => {
    console.log("conneced successfully")
  })
  .catch((err) => {
    console.log("connectd unsuccessfully", err)
  })

module.exports = mongoose