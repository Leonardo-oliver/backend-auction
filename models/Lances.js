const mongoose = require('mongoose');

const LanceProduct = mongoose.model('LanceProduct', {
  lance: Array,
  name: Array,
  valorAtual: Number
})

module.exports = LanceProduct