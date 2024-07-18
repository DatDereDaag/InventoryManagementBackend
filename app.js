const express = require("express");

const productRoutes = require("./routes/product");
const salesRoutes = require("./routes/sales");

const app = express();

app.use("/products", productRoutes);
app.use("/sales", salesRoutes);

module.exports = app;
