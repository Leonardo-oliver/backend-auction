const multer = require('multer');
const path = require('path')
const crypto = require('path')

const filter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

module.exports = {
  dest: path.resolve(__dirname, '..', 'temp', 'upload'),
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname, '..', 'temp', 'upload'));
    },
    filename: (req, file, cb) => {
      cb(null, new Date().toISOString() + file.originalname);
    },
  }),
  limits: {
    fileSize: 2 * 1024 * 1024
  },
  fileFilter: filter
}