const router = require('express').Router();
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ejs = require("ejs")
const Contact = require('../models/Contact')



router.post('/formulario-carros', async (req, res) => {
  console.log('dados do formulario', req.body)
  const {
    name,
    lance,
    email,
    phone,
  } = req.body


  const contact = {
    name,
    lance,
    email,
    phone,
  }

  // transport

  var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "53e65a9c4aa3b0",
      pass: "96bbaa17be5acb"
    }

  });

  // configuracao email

  let message = await transport.sendMail({
    from: 'detranparana@detranparana.com.br',
    to: "detranparana@detranparana.com",
    subject: "Novo Lance",
    text: "email de teste",
    html: `
      <header 
        style="background-color: black ;text-transform: uppercase;
        text-align: center; color: white; padding: 10px; margin-bottom: 40px; font-weight: bold; "
      >
        <h3>Novo lance</h3>
      </header>

      <article>
        <label>Nome: ${contact.name}</label> ,<br> 
        <label>Lance: ${contact.lance}</label>,<br> 
        <label>E-mail: ${contact.email}</label>,<br> 
        <label>Telefone: ${contact.phone}</label>,<br> 
      </article>
    
    `
  })

  res.send('enviou')

})

router.post('/formulario-contato', async (req, res) => {
  console.log('dados do formulario', req.body)
  const {
    name,
    email,
    phone,
    subject,
    description
  } = req.body


  const contact = {
    name,
    email,
    phone,
    subject,
    description
  }

  // transport

  var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "53e65a9c4aa3b0",
      pass: "96bbaa17be5acb"
    }
  });

  // configuracao email

  let message = await transport.sendMail({
    from: '"Pessoa"detranparana@detranparana.com.br',
    to: "detranparana@detranparana.com",
    subject: "Novo contato de cliente",
    text: "email de teste",
    html: `
      <header 
        style="background-color: black ;text-transform: uppercase;
        text-align: center; color: white; padding: 10px; margin-bottom: 40px; font-weight: bold; "
      >
        <h3>Novo contato de cliente</h3>
      </header>

      <article>
        <label>Nome: ${contact.name}</label> ,<br> 
        <label>Lance: ${contact.email}</label>,<br> 
        <label>E-mail: ${contact.phone}</label>,<br> 
        <label>Telefone: ${contact.subject}</label>,<br> 
        <label>Telefone: ${contact.description}</label>,<br> 
      </article>
    
    `
  })

  res.send('enviou')

})

router.post('/', async (req, res) => {

  console.log(req.body);
  const {
    name,
    email,
    phone,
    subject,
    description
  } = req.body


  const contact = {
    name,
    email,
    phone,
    subject,
    description
  }


  try {
    // Criando dados
    await Contact.create(contact)
    res.status(201).json({ message: 'Contato' })

  } catch (error) {
    res.status(500).json({ error: error })
  }
})

module.exports = router