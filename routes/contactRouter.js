const router = require('express').Router();
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Contact = require('../models/Contact')

// Create - Criação
router.get('/', async (req, res) => {

  var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "9bb3df910dfcab",
      pass: "49b07cda0934cf"
    }
  });

  let message = await transport.sendMail({
    from: "sender@server.com",
    to: "receiver@sender.com",
    subject: "Criaçao de email",
    text: "Plaintext version of the message",
    html: "<p>HTML version of the message</p>"
  })


  res.send('enviou')
})

// req.body
//  const { name, email, phone, subject, description } = req.body

//  if (!name) {
//    res.status(422).json({ error: 'o nome é obrigatório' })
//    return
//  }

//  const contact = {
//    name,
//    email,
//    phone,
//    subject,
//    description
//  }
//  try {
//    // Criando dados
//    await Contact.create(contact)
//    res.status(201).json({ message: 'Email enviado com sucesso!' })

//  } catch (error) {
//    res.status(500).json({ error: error })
//  }

module.exports = router