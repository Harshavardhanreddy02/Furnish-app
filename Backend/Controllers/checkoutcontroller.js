// controllers/checkoutcontroller.js
const Checkout = require('../models/Checkout')
const Cart = require('../models/Cart')
const Product = require('../models/Product')
const Order = require('../models/Order')

// ✅ Create Checkout
const createcheckout = async (req, res) => {
  const { checkoutitems, shippingaddress, paymentmethod, totalprice } = req.body

  if (!checkoutitems || checkoutitems.length === 0) {
    return res.status(400).json({ message: "No items in checkout" })
  }

  try {
    const newcheckout = await Checkout.create({
      user: req.user._id,
      checkoutitems,
      shippingaddress,
      paymentmethod,
      totalprice,
      paymentstatus: "pending",
      ispaid: false,
      isfinalized: false
    })

    console.log(`Checkout created for user: ${req.user._id}`)
    res.status(201).json(newcheckout)
  } catch (err) {
    console.error("Error creating checkout:", err)
    res.status(500).json({ message: "Server error" })
  }
}

// ✅ Update Checkout with payment
const updatecheckout = async (req, res) => {
  const { paymentstatus, paymentdetails } = req.body
  try {
    const checkout = await Checkout.findById(req.params.id)
    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found" })
    }

    if (paymentstatus === "paid") {
      checkout.ispaid = true
      checkout.paymentstatus = paymentstatus
      checkout.paymentdetails = paymentdetails
      checkout.paidat = Date.now()
      await checkout.save()
      res.status(200).json(checkout)
    } else {
      res.status(400).json({ message: "Invalid payment status" })
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

// ✅ Finalize Checkout → Create Order
const paymentcheckout = async (req, res) => {
  try {
    const checkout = await Checkout.findById(req.params.id)
    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found" })
    }

    if (checkout.ispaid && !checkout.isfinalized) {
      const finalorder = await Order.create({
        user: checkout.user,
        orderitems: checkout.checkoutitems, // ✅ Corrected field
        shippingaddress: checkout.shippingaddress,
        paymentmethod: checkout.paymentmethod,
        totalprice: checkout.totalprice,
        ispaid: true,
        paidat: checkout.paidat,
        isdelivered: false,
        paymentstatus: "paid",
        paymentdetails: checkout.paymentdetails
      })

      checkout.isfinalized = true
      checkout.finalizedat = Date.now()
      await checkout.save()

      // Delete cart after order creation
      await Cart.findOneAndDelete({ user: checkout.user })

      res.status(201).json(finalorder)
    } else if (checkout.isfinalized) {
      res.status(400).json({ message: "Checkout already finalized" })
    } else {
      res.status(400).json({ message: "Checkout payment not completed yet" })
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}
module.exports = { createcheckout, updatecheckout, paymentcheckout }