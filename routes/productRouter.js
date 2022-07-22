const router = require('express').Router()
const path = require('path');
const Product = require('../models/Product')
const multer = require('multer');
const util = require("util");


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
}).array("imageProduct", 10)

const uploadAsync = util.promisify(upload);

// Create - Criação produto
router.post('/', async (req, res) => {

  res.setHeader('Content-Type', 'application/json');

  try {
    await uploadAsync(req, res);
    console.log('items add', req.body)

    // Criando dados
    // console.log('caminho image', req.files);
    const {
      marca,
      modelo,
      categoria,
      lanceInicial,
      versao,
      anoDeFabricacao,
      blindado,
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
      lances,

    } = req.body

    const imageProduct = []
    let i
    for (i = 0; i < req.files.length; i++) {
      const { path: imageProductNew } = req.files[i]
      console.log('imagensssss: ', imageProduct)
      imageProduct.push(imageProductNew)
    }

    const product = {
      marca,
      modelo,
      categoria,
      lanceInicial,
      versao,
      anoDeFabricacao,
      blindado,
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
      lances,
      imageProduct
    }

    await Product.create(product)

    if (req.files.length <= 0) {
      // console.log('caminho image', req.files.path);

      return res.send({ success: `You must select at least 1 file.` });
    }


    // res.status(201).json({ message: 'Produto inserido com sucesso!' })
    return res.send({ success: `Produto inserido com sucesso!` });
  } catch (error) {
    console.log(error);
    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.send({ error: "Too many files to upload." });
    }
    return res.send({ error: `Error when trying upload many files: ${error}` });
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


// Create - Criação dos lances dos carros
router.post('/lance/:id', async (req, res) => {
  console.log('carregou', req.body)

  const id = req.params.id

  const {
    name,
    lance,
  } = req.body

  const lancesDoProduto = {
    name,
    lance,
  }

  const product = await Product.findOne({ _id: id })
  product.lances.push(lancesDoProduto)
  const updateProduct = await Product.updateOne({ _id: id }, product)

  if (updateProduct.matchedCount === 0) {
    res.status(422).json({ message: 'Produto não foi localizado!' })
    return
  } else res.status(200).json(product)

  console.log('produto carregado: ', product)

})

router.delete('/lance/:id', async (req, res) => {
  console.log('carregou', req.body)

  const id = req.params.id

  const {
    name,
    lance,
  } = req.body

  const lancesDoProduto = {
    name,
    lance,
  }

  // const product = await Product.findOne({ _id: id })
  // product.lances.push(lancesDoProduto)
  const updateProduct = await Product.deleteOne({ _id: id }, product)

  if (updateProduct.matchedCount === 0) {
    res.status(422).json({ message: 'Produto não foi localizado!' })
    return
  } else res.status(200).json(product)

  console.log('produto carregado: ', product)

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
    blindado,
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
    blindado,
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
  const product = await Product.findOne({ _id: id })

  if (!product) {
    res.status(422).json({ message: 'O carro não foi localizado!' })
    return
  }

  try {

    await Product.deleteOne({ _id: id })
    res.status(200).json({ message: 'Carro excluido removido com sucesso !' })
    return
  } catch (error) {
    res.status(500).json({ error: error })
  }

})

module.exports = router