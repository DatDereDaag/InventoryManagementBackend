const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: { type: Number, required: true },
  sale_amt: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Sale", saleSchema);
