const mongoose = require('mongoose');

// Schema for a single product inside checkout
const checkoutProductSchema = new mongoose.Schema(
  {
    productid: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
  },
  { _id: false } 
);

// Schema for the whole checkout
const checkoutSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    checkoutitems: [checkoutProductSchema], 

    shippingaddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalcode: { type: String, required: true },
        country: { type: String, required: true },
    },

    paymentmethod: { type: String, required: true },
    totalprice: { type: Number, required: true },

    ispaid: { type: Boolean, default: false },
    paidat: { type: Date },

    paymentstatus: { type: String, default: 'pending' },
    paymentdetails: { type: mongoose.Schema.Types.Mixed }, 

    isfinalized: { type: Boolean, default: false },
    finalizedat: { type: Date }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Checkout', checkoutSchema);
