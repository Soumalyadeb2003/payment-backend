const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const auth = require("../middleware/authMiddleware");

router.post("/create", auth, async (req, res) => {
  try {
    const { items, totalAmount, paymentMethod } = req.body;

    const order = new Order({
      userId: req.user.userId,
      items,
      totalAmount,
      paymentMethod,
      paymentStatus: "pending",
    });

    await order.save();

    res.status(201).json({
      message: "Order created successfully!",
      order,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.get("/my-orders", auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.userId })
      .sort({ createdAt: -1 });

    res.json({ orders });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found!" });
    }

    res.json({ order });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;