const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    required:true,
    unique: true,
    minlength: 5
  },
  email: {
    type:String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return validator.isEmail(value)
      },
      message: function () {
        return 'invalid email enter, please check email'
      }
    }
  },
  occupation: {
    type: String,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 128
  },
  tokens: [{
    token: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
})

userSchema.pre('save', function (next) {
  const user = this
  if (user.isNew) {
    bcryptjs.genSalt(10)
      .then(function (salt) {
        bcryptjs.hash(user.password, salt)
          .then(function (encryptedPassword) {
            user.password = encryptedPassword
            next()
          })
      })
  } else {
    next()
  }
})

// own static method
userSchema.statics.findByCredentials = function (email, password) {
  const User = this
  return User.findOne({ email })
    .then(function (user) {
      if (!user) {
        return Promise.reject({ errors: 'invalid email or password' })
      }
      return bcryptjs.compare(password, user.password)
        .then(function (result) {
          if (result) {
            // console.log(user)
            return Promise.resolve(user)
          } else {
            return Promise.reject({ errors: 'invalid email or password' })
          }
        })
        .catch(function (err) {
          return Promise.reject(err)
        })
    })
    .catch(function (err) {
      return Promise.reject(err)
      // return new Promise(function(resolve,reject){
      // reject(err)
      // })
    })
}

// ' instance methods'
userSchema.methods.generateToken = function () {
  const user = this
  const tokenData = {
    _id: user._id,
    username: user.username,
    createdAt: Number(new Date())
  }
  const token = jwt.sign(tokenData, 'jwt@123')
  user.tokens.push({ token })

  return user.save()
    .then(function (user) {
      return Promise.resolve(token)
    })
    .catch(function (err) {
      return Promise.reject(err)
    })
}

userSchema.statics.findByToken = function (token) {
  const User = this
  console.log(token)
  let tokenData
  try {
    tokenData = jwt.verify(token, 'jwt@123')
    console.log(tokenData)
  } catch (error) {
    return Promise.reject(error)
  }
  return User.findOne({
    _id: tokenData._id,
    'tokens.token': token
  })
}

const User = mongoose.model('User', userSchema)

module.exports = User