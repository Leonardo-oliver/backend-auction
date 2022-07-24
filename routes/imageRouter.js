const router = require('express').Router();

const path = require('path');
const fs = require("fs");
const multer = require("multer");

const Image = require('../models/Image')

const multerS3 = require('multer-s3');
const aws = require("aws-sdk");

// router.set("view engine", "ejs");


const storageType = {
  local: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads');
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  }),
  s3: multerS3({
    s3: new aws.S3(),
    bucket: 'upload-cars-new',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  })
}


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
  storage: storageType['s3'],
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: filter
})



router.post('/', upload.single('imageProduct'), async function (req, res) {

  console.log(req.file)

  const { originalname: name, fieldname: desc, location: imageProduct } = req.file


  const image = {
    name,
    desc,
    imageProduct
  }
  console.log('imagem :', image)
  try {
    // Criando dados
    await Image.create(image)
    res.status(201).json({ message: 'Imagem cadastrado com sucesso!' })

  } catch (error) {
    res.status(500).json({ error: error })
  }
  // req.file é o arquivo avatar que vem do form <input type="file" name="avatar" />
  // req.body os campos de texto se houver algum
})

router.get("/", async (req, res) => {
  // res.render("index");

  try {
    //   // Criando dados
    const image = await Image.find()
    res.status(201).json(image)

  } catch (error) {
    res.status(500).json({ error: error })
  }
})



module.exports = router