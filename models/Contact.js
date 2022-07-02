const mongoose = require('mongoose');

const Contact = mongoose.model('Contact', {
  name: String,
  email: String,
  phone: Number,
  subject: String,
  description: String,
})

module.exports = Contact