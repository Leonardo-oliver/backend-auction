const mongoose = require('mongoose');

const Image = mongoose.model('Image', {
  name: String,
  desc: String,
  imageProduct: Array

})


module.exports = Image