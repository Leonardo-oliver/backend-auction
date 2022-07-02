const router = require('express').Router()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


const Person = require('../models/Person')

// Create - Criação
router.post('/', async (req, res) => {
  // req.body
  const { name, email, phone, password, confirmPassword, } = req.body

  if (!name) {
    res.status(422).json({ error: 'o nome é obrigatório' })
    return
  }

  if (!email) {
    res.status(422).json({ error: 'o email é obrigatório' })
    return
  }

  if (!password) {
    res.status(422).json({ error: 'a senha é obrigatória' })
    return
  }

  if (password !== confirmPassword) {
    res.status(422).json({ error: 'as senhas não conferem!' })
    return
  }

  const userExist = await Person.findOne({ email: email })

  if (userExist) {
    res.status(422).json({ msg: 'Por favor , ultize outro e-mail' })
  }

  // crete password
  const salt = await bcrypt.genSalt(12)
  const passwordHash = await bcrypt.hash(password, salt)


  const person = {
    name,
    email,
    phone,
    password: passwordHash
  }
  try {
    // Criando dados
    await Person.create(person)
    res.status(201).json({ message: 'Pessoa inserida no sistema com sucesso!' })

  } catch (error) {
    res.status(500).json({ error: error })
  }
})

// Private Route

router.get('/:id', checkToken, async (req, res) => {
  const id = req.params.id

  // check if user exists
  const user = await Person.findById(id, '-password')

  if (!user) {
    return res.status(404).json({ msg: 'Usuário não localizado!' })
  }

  res.status(200).json({ user })
  console.log(user)

})

function checkToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) {
    return res.status(401).json({ msg: "Acesso negado" })
  }

  try {
    const secret = process.env.SECRET
    jwt.verify(token, secret)

    next()
  } catch (error) {
    res.status(400).json({ msg: "Token inválido!" })
  }

}

// Login

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(422).json({ msg: 'O email é obrigatorio!' })
  }

  if (!password) {
    return res.status(422).json({ msg: 'A senha é obrigatorio!' })
  }

  // check if user 
  user = await Person.findOne({ email: email })
  if (!user) {
    return res.status(404).json({ msg: 'Usuário não localizado!' })
  }

  // check if senha

  const checkPassword = await bcrypt.compare(password, user.password)
  if (!checkPassword) {
    return res.status(422).json({ msg: 'Senha invalida!' })
  }

  try {
    const secret = process.env.SECRET
    const token = jwt.sign(
      {
        id: user._id,
      },
      secret,
    )
    res.status(200).json({ msg: 'Autenticação realizada com sucesso', token })

  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: 'Aconteceu um erro no servidor' })
  }
})

// Read - Leitura de dados

router.get('/', async (req, res) => {
  try {
    // mostrando dados
    const people = await Person.find()
    res.status(201).json(people)

  } catch (error) {
    res.status(500).json({ error: error })
  }

})

router.get('/:id', async (req, res) => {
  // extrair o dado da requisicao, pela url = req.params
  const id = req.params.id
  try {
    // mostrando dados
    const person = await Person.findOne({ _id: id })
    if (!person) {
      res.status(422).json({ message: 'O usuario não foi localizado!' })
      return
    }
    res.status(200).json(person)

  } catch (error) {
    res.status(500).json({ error: error })
  }
})

// Update - Atualização (PUT, PATCH)

router.patch('/:id', async (req, res) => {

  const id = req.params.id

  const { name, email, phone, password, confirmPassword, } = req.body

  const person = {
    name,
    email,
    phone,
    password,
    confirmPassword,
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