const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());

const authRoutes = require("./routes/auth");
const orderRoutes = require("./routes/orders");
const paymentRoutes = require("./routes/payments");
const productRoutes = require("./routes/products");

app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Soumalya's Payment Portal Backend is running!");
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 10000,
  family: 4,
})
.then(() => {
  console.log("MongoDB connected successfully!");
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch((err) => {
  console.log("MongoDB connection error:", err.message);
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT} without MongoDB`);
  });
});