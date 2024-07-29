const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: {
      type: Number,
      required: true,
      min: [0, "Price cannot be negative"],
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "Quantity cannot be negative"],
    },
    description: { type: String, required: false },
    category: { type: String, required: false },
    supplier: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
