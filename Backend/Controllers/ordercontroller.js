// Controllers/ordercontroller.js
const Order = require("../models/Order");

const getorders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "server error" });
    }
};

const getsingleorder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate("user", "name email");
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.json(order);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "server error" });
    }
};

module.exports = { getorders, getsingleorder };
