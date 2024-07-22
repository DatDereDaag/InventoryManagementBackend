const mongoose = require("mongoose");
const Product = require("../models/product");

exports.get_product = async (req, res, next) => {
  const productID = req.params.productID;

  try {
    const product = await Product.findById(productID);

    if (product) {
      res.status(200).json({ product });
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Error retrieving product" });
  }
};

exports.get_all = async (req, res, next) => {
  try {
    const products = await Product.find();
    if (products.length > 0) {
      res.status(200).json(products);
    } else {
      res.status(200).json({ message: "No products found" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Error retrieving data" });
  }
};

exports.update_product = async (req, res, next) => {
  const productId = req.params.productID;

  if (req.body.name) {
    const product = await Product.find({ name: req.body.name });

    if (product) {
      return res
        .status(400)
        .json({ message: "Product name already exists in database" });
    }
  }

  try {
    const result = await Product.findByIdAndUpdate(productId, req.body, {
      new: true,
    });

    if (result) {
      res.status(200).json({ message: "Product updated successfully", result });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Error updating product" });
  }
};

exports.create_product = async (req, res, next) => {
  const name = await Product.findOne({ name: req.body.name });

  if (name) {
    return res.status(400).json({ message: "Product already exists" });
  }

  try {
    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      quantity: req.body.quantity,
      category: req.body.category,
      supplier: req.body.supplier,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const result = await product.save();
    res.status(201).json({ message: "Product created successfully", result });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.delete_product = async (req, res, next) => {
  const productId = req.params.productID;

  try {
    const result = await Product.findByIdAndDelete(productId);
    if (result) {
      res
        .status(200)
        .json({ message: "Product deleted successfully", dataDeleted: result });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Error deleting product" });
  }
};
