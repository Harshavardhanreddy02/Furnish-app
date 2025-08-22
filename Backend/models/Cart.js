const mongoose = require('mongoose')

const CartitemSchema = new mongoose.Schema({
     productid: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
     },
     name: String,
     image: String,
     price: String,
     size: String,
     color: String,
     quantity: {
          type: Number,
          required: true,
          default: 1
     },
     dimension: {
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
