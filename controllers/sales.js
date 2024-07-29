const mongoose = require("mongoose");
const Sale = require("../models/sales");
const Product = require("../models/product");

exports.get_all = async (req, res, next) => {
  try {
    const sales = await Sale.find().populate("product");
    if (sales.length > 0) {
      res.status(200).json({ length: sales.length, sales });
    } else {
      res.status(200).json({ message: "No sales found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error retrieving data" });
  }
};

exports.get_sale = async (req, res, next) => {
  const saleId = req.params.sale;

  try {
    const sale = await Sale.findById(saleId);

    if (sale) {
      res.status(200).json(sale);
    } else {
      res.status(404).json({ message: "Sale not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error retrieving sale" });
  }
};

exports.create_sale = async (req, res, next) => {
  const productID = req.body.productID;
  const foundProduct = await Product.findById(productID);

  if (!foundProduct) {
    return res.status(404).json({ message: "Product not found" });
  } else if (foundProduct.quantity < req.body.quantity) {
    return res
      .status(400)
      .json({ message: "Insufficient quantity in inventory" });
  } else if (req.body.quantity < 0) {
    return res.status(400).json({ message: "Invalid quantity" });
  } else if (req.body.sold_for < 0) {
    return res.status(400).json({ message: "Invalid sold_for price" });
  }

  try {
    const sale = new Sale({
      product: productID,
      quantity: req.body.quantity,
      unit_price: foundProduct.price,
      sold_for: req.body.sold_for,
      total: req.body.quantity * foundProduct.price,
    });

    const result = await sale.save();

    foundProduct.quantity -= req.body.quantity;
    await foundProduct.save();

    res.status(201).json({ message: "Sale created successfully", result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error creating sale" });
  }
};

exports.update_sale = async (req, res, next) => {
  if (req.body.quantity && req.body.quantity < 0) {
    return res.status(400).json({ message: "Invalid quantity" });
  } else if (req.body.sold_for && req.body.sold_for < 0) {
    return res.status(400).json({ message: "Invalid sold_for price" });
  }

  try {
    const sale = await Sale.findById(req.params.saleID);

    if (!sale) {
      return res.status(404).json({ message: "Sale not found" });
    }

    if (req.body.quantity) {
      const product = Product.findById(sale.product);

      if (product.length > 0) {
        console.log(product);
        product.quantity += sale.quantity - req.body.quantity;

        if (product.quantity < 0) {
          return res
            .status(400)
            .json({ message: "Insufficient quantity in inventory" });
        }

        await product.save();
      }
    }

    sale.quantity = req.body.quantity || sale.quantity;
    sale.sold_for = req.body.sold_for || sale.sold_for;
    sale.total = sale.quantity * sale.unit_price;

    const result = await sale.save();
    res.status(200).json({ message: "Sale updated successfully", result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error updating sale" });
  }
};

exports.delete_sale = async (req, res, next) => {
  const saleId = req.params.saleID;
  try {
    const sale = await Sale.findByIdAndDelete(saleId);
    if (sale) {
      const product = await Product.findById(sale.product);
      if (product) {
        product.quantity += sale.quantity;
        await product.save();
      }
      res
        .status(200)
        .json({ message: "Sale deleted successfully", dataDeleted: sale });
    } else {
      res.status(404).json({ message: "Sale not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error retrieving sale" });
  }
};
