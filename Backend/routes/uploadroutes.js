const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { imageupload } = require('../Controllers/imageupload');
require('dotenv').config();

const router = express.Router();

// configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// configure multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// route
router.post('/', upload.single('image'), imageupload);

module.exports = router;
