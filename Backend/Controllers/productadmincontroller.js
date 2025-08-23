const Product = require('../models/Product')

const getallproduct = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};






module.exports = { getallproduct };