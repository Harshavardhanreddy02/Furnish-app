const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

const imageupload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // function to upload stream to cloudinary
    const streamupload = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream((error, result) => {
          if (result) resolve(result);
          else reject(error);
        });
        streamifier.createReadStream(fileBuffer).pipe(stream);
      });
    };

    // upload the file
    const result = await streamupload(req.file.buffer);

    res.json({ imageurl: result.secure_url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { imageupload };
