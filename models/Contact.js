const mongoose = require('mongoose');

const Contact = mongoose.model('Contact', {
  name: String,
  email: String,
  lance: Number,
  phone: Number,

})

module.exports = Contact