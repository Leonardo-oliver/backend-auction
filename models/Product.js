const mongoose = require('mongoose');

const Product = mongoose.model('Product', {
  marca: String,
  modelo: String,
  categoria: String,
  lanceInicial: Number,
  versao: String,
  anoDeFabricacao: String,
  anoModelo: Number,
  fipe: Number,
  combustivel: String,
  cor: String,
  chaves: String,
  sinistro: String,
  km: Number,
  ipva: String,
  DpvatLicenciamento: String,
  CrlvCrv: String,
  conservacao: String,
  motorCambio: String,
  veiculoEstado: String,
  dataFinal: String,
  name: String,
  lance: Number,
  imageProduct: Array
})

module.exports = Product