const mongoose = require('mongoose');

const Product = mongoose.model('Product', {
  nameProduto: String,
  dataAnoNumero: String,
  lanceInicial: Number,
  ano: String,
  transmissao: String,
  quilometragem: String,
  tipoDocumento: String,
  cor: String,
  blindado: String,
  combustivel: String,
  tipoDeMonta: String,
  condicao: String,
  valorTabelaFipe: Number,
  possuiChave: String,
  tipoChassi: String,
  nameImage: String,
  size: String,
  key: String,
  url: String,
  createdAt: {
    type: Date,
    dafault: Date.now
  }
})

module.exports = Product