require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const app = express()

// forma de ler json / middlewares

app.use(express.urlencoded({
  extended: true,
})
)

app.use('/upload', express.static('uploads'));

app.use(express.json());

// rotas da API
const PersonRoutes = require('./routes/personRouter')
app.use('/person', PersonRoutes)

const ProductRoutes = require('./routes/productRouter')
app.use('/product', ProductRoutes)

const ContactRoutes = require('./routes/contactRouter')
app.use('/contact', ContactRoutes)

// Rota inicial / Endpoint

app.get('/person', (req, res) => {
  return res.json({ teste: 'oi monster' })
})

// entregar um porta

const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose
  .connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.nuhx3j5.mongodb.net/?retryWrites=true&w=majority`)
  .then(() => {
    console.log('conectamos ao MongoDB')
    app.listen(3000)
  })
  .catch((err) => console.log(err))