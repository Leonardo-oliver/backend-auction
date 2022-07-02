const mongoose = require('mongoose');

const Person = mongoose.model('Person', {
  name: String,
  email: String,
  phone: Number,
  password: String,
  confirmPassword: String,
})

module.exports = Person