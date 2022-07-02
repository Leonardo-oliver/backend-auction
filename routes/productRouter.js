const router = require('express').Router()

const Product = require('../models/Product')
const multer = require('multer');

const multerConfig = require('../config/multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
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
router.post('/', upload.single('produto_imagem'), async (req, res) => {
  console.log(req.file)
  // req.body
  const {
    nameProduto,
    dataAnoNumero,
    lanceInicial,
    ano,
    transmissao,
    quilometragem,
    tipoDocumento,
    cor,
    blindado,
    combustivel,
    tipoDeMonta,
    condicao,
    valorTabelaFipe,
    possuiChave,
    tipoChassi,

  } = req.body

  const { originalname: nameImage, size, filename: key, path: url } = req.file


  const data = [{
    nameProduto,
    dataAnoNumero,
    lanceInicial,
    ano,
    transmissao,
    quilometragem,
    tipoDocumento,
    cor,
    blindado,
    combustivel,
    tipoDeMonta,
    condicao,
    valorTabelaFipe,
    possuiChave,
    tipoChassi,
    nameImage,
    size,
    key,
    url
  }]
  console.log(data)

  try {
    // Criando dados
    await Product.create(data)
    res.status(201).json({ message: 'Produto inserido com sucesso!' })

  } catch (error) {
    res.status(500).json({ error: error })
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

router.patch('/:id', async (req, res) => {

  const id = req.params.id

  const { name, email, telefone, senha } = req.body

  const person = {
    name,
    email,
    telefone,
    senha
  }
  try {

    const updatePerson = await Person.updateOne({ _id: id }, person)

    if (updatePerson.matchedCount === 0) {
      res.status(422).json({ message: 'O usuario não foi localizado!' })
      return
    }
    res.status(200).json(person)

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