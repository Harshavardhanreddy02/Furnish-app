const mongoose = require('mongoose');

const orderitemschema = new mongoose.Schema(
     {
          productid: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
          name: { type: String, required: true },
          image: { type: String, required: true },
          price: { type: Number, required: true },
          size:  String,
          color: String,
          quantity: { type: Number, required: true }
     },{
          _id: false
     }
)

const orderschema = new mongoose.Schema(
     {
          user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
          orderitems: [orderitemschema],
          shippingaddress: {
               address: { type: String, required: true },
               city: { type: String, required: true },
               postalcode: { type: String, required: true },
               country: { type: String, required: true }
          },
          paymentmethod: { type: String, required: true },
          totalprice: { type: Number, required: true },
          ispaid: { type: Boolean, default: false },
          paidat: { type: Date },
          isdelivered: { type: Boolean, default: false },
          deliveryat: { type: Date },
          paymentstatus: { type: String, default: 'pending' },
          status:{type:String,enum:['shipped','processing','delivered','cancelled'],default:'processing'},
     },
     { timestamps: true }
)

module.exports = mongoose.model('Order', orderschema)
