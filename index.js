require('dotenv').config()
const bodyParser = require("body-parser");
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express()

// forma de ler json / middlewares

app.use(cors());

app.use(express.urlencoded({
  extended: false,
})
)

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded(
  { extended: true }
))

app.use('/uploads', express.static('uploads'));

app.use(express.json());

// rotas da API
const PersonRoutes = require('./routes/personRouter')
app.use('/person', PersonRoutes)

const ProductRoutes = require('./routes/productRouter')
app.use('/product', ProductRoutes)

const ContactRoutes = require('./routes/contactRouter')
app.use('/contact', ContactRoutes)

const Image = require('./routes/imageRouter')
app.use('/image', Image)

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

  })
  .catch((err) => console.log(err))

app.listen(process.env.PORT || 3000)