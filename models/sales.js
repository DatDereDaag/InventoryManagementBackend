const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "Quantity cannot be negative"],
    },
    unit_price: {
      type: Number,
      required: true,
    },
    sold_for: {
      type: Number,
      required: true,
      min: [0, "Price sold at cannot be negative"],
    },
    total: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sale", saleSchema);
