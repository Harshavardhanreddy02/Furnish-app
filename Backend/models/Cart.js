const mongoose = require('mongoose')

const CartitemSchema = new mongoose.Schema({
     productid: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
     },
     name: String,
     images: String,
     price: String,
     sizes: String,
     colors: String,
     quantity: {
          type: Number,
          required: true,
          default: 1
     },
     dimensions: {
          length: Number,
          width: Number,
          height: Number
     }
}, { _id: false })

const cartSchema = new mongoose.Schema({
     user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
     },
     guestid: {
          type: String,
     },
     products: [CartitemSchema],
     totalprice: {
          type: Number,
          required: true,
          default: 0
     }
}, { timestamps: true })

module.exports = mongoose.model("Cart", cartSchema)
