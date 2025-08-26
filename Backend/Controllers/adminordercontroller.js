const Order = require('../models/Order')

const getallorders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', ' name email');
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const updateorderstatus = async (req, res) => {
 
  try {
     const order = await Order.findById(req.params.id).populate('user','name')
     if (!order) {
       return res.status(404).json({ message: "Order not found" });
     }
     order.status = req.body.status || order.status;
     order.isdelivered = req.body.status === "delivered"? true : order.isdelivered;
     order.deliveryat = req.body.status === "delivered" ? Date.now() : order.deliveryat;
     await order.save();
     res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteorder = async (req, res) => {
     try {
         const order = await Order.findByIdAndDelete(req.params.id);
         if (!order) {
             return res.status(404).json({ message: "Order not found" });
         }
         res.json({ message: "Order deleted successfully" });
     } catch (err) {
         console.error(err);
         res.status(500).json({ message: "Server error" });
     }
}

module.exports = { getallorders, updateorderstatus, deleteorder };