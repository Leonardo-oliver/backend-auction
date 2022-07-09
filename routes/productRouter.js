const router = require('express').Router()
const path = require('path');
const Product = require('../models/Product')
const multer = require('multer');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
})

const filter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: filter
})

// Create - Criação produto
router.post('/', upload.single('imageProduct'), async (req, res) => {

  const {
    marca,
    modelo,
    categoria,
    lanceInicial,
    versao,
    anoDeFabricacao,
    anoModelo,
    fipe,
    combustivel,
    cor,
    sinistro,
    chaves,
    km,
    ipva,
    DpvatLicenciamento,
    CrlvCrv,
    conservacao,
    motorCambio,
    veiculoEstado,
    dataFinal,
    name,
    lance,

  } = req.body


  const { path: imageProduct } = req.file


  const product = {
    marca,
    modelo,
    categoria,
    lanceInicial,
    versao,
    anoDeFabricacao,
    anoModelo,
    fipe,
    combustivel,
    cor,
    sinistro,
    chaves,
    km,
    ipva,
    DpvatLicenciamento,
    CrlvCrv,
    conservacao,
    motorCambio,
    veiculoEstado,
    dataFinal,
    name,
    lance,
    imageProduct
  }

  console.log('Produto cadastrado: ', product)

  try {
    // Criando dados
    await Product.create(product)
    res.status(201).json({ message: 'Produto inserido com sucesso!' })

  } catch (error) {
    res.status(500).json({ error: error })
    console.log('esse e erro: ', error)
  }
})

// Read - Leitura de dados

router.get('/', async (req, res) => {
  try {
    // mostrando dados
    const product = await Product.find()
    res.status(201).json(product)

  } catch (error) {
    res.status(500).json({ error: error })
  }

})

router.get('/:id', async (req, res) => {
  // extrair o dado da requisicao, pela url = req.params
  const id = req.params.id
  try {
    // mostrando dados
    const product = await Product.findOne({ _id: id })
    if (!product) {
      res.status(422).json({ message: 'Produto nao localizado!' })
      return
    }
    res.status(200).json(product)

  } catch (error) {
    res.status(500).json({ error: error })
    console.log('qual e o erro :', error)
  }
})

// Update - Atualização (PUT, PATCH)

router.post('/:id', async (req, res) => {

  const id = req.params.id

  const {
    marca,
    modelo,
    categoria,
    lanceInicial,
    versao,
    anoDeFabricacao,
    anoModelo,
    fipe,
    combustivel,
    cor,
    sinistro,
    chaves,
    km,
    ipva,
    DpvatLicenciamento,
    CrlvCrv,
    conservacao,
    motorCambio,
    veiculoEstado,
    dataFinal,
    name,
    lance,
  } = req.body

  const product = {
    marca,
    modelo,
    categoria,
    lanceInicial,
    versao,
    anoDeFabricacao,
    anoModelo,
    fipe,
    combustivel,
    cor,
    sinistro,
    chaves,
    km,
    ipva,
    DpvatLicenciamento,
    CrlvCrv,
    conservacao,
    motorCambio,
    veiculoEstado,
    dataFinal,
    name,
    lance,
  }
  try {

    const updateProduct = await Product.updateOne({ _id: id }, product)

    if (updateProduct.matchedCount === 0) {
      res.status(422).json({ message: 'Produto não foi localizado!' })
      return
    }
    res.status(200).json(product)

  } catch (error) {
    res.status(500).json({ error: error })
  }
})

// Update - Atualização (PUT, PATCH)

router.patch('/:id', async (req, res) => {

  const id = req.params.id

  const {
    marca,
    modelo,
    categoria,
    lanceInicial,
    versao,
    anoDeFabricacao,
    anoModelo,
    fipe,
    combustivel,
    cor,
    sinistro,
    chaves,
    km,
    ipva,
    DpvatLicenciamento,
    CrlvCrv,
    conservacao,
    motorCambio,
    veiculoEstado,
    dataFinal,
    name,
    lance,
  } = req.body

  const product = {
    marca,
    modelo,
    categoria,
    lanceInicial,
    versao,
    anoDeFabricacao,
    anoModelo,
    fipe,
    combustivel,
    cor,
    sinistro,
    chaves,
    km,
    ipva,
    DpvatLicenciamento,
    CrlvCrv,
    conservacao,
    motorCambio,
    veiculoEstado,
    dataFinal,
    name,
    lance,
  }
  try {

    const updateProduct = await Product.updateOne({ _id: id }, product)

    if (updateProduct.matchedCount === 0) {
      res.status(422).json({ message: 'Produto não foi localizado!' })
      return
    }
    res.status(200).json(product)

  } catch (error) {
    res.status(500).json({ error: error })
  }
})

// Delete - deletar dados

router.delete('/:id', async (req, res) => {

  const id = req.params.id
  const person = await Person.findOne({ _id: id })

  if (!person) {
    res.status(422).json({ message: 'O usuario não foi localizado!' })
    return
  }

  try {

    await Person.deleteOne({ _id: id })
    res.status(200).json({ message: 'Usuario removido com sucesso !' })
    return
  } catch (error) {
    res.status(500).json({ error: error })
  }

})

module.exports = router