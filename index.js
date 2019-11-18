const express = require('express') // 
const port = 3005
const app = express()

const cors = require('cors') // this package for the cors problem

const mongoose = require('./config/database')

const userRouter = require('./app/controller/userControllers')
const budgetRouter = require('./app/controller/budgetControllers')
const categoryRouter = require('./app/controller/categoryControllers')
const expenseRouter = require('./app/controller/expenseControllers')

app.use(express.json())
app.use(cors())

app.use('/users', userRouter)
app.use('/budgets', budgetRouter)
app.use('/categories', categoryRouter)
app.use('/expenses', expenseRouter)

app.listen(port, () => {
  console.log("listening to port", port)
})
