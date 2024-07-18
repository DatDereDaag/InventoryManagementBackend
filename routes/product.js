const express = require("express");
const router = express.Router();

const ProductController = require("../controllers/product.js");

router.get("/", ProductController.get_all);

router.get("/:productID", ProductController.get_product);

router.post("/", ProductController.create_product);

router.patch("/:productID", ProductController.update_product);

router.delete("/:productID", ProductController.delete_product);

module.exports = router;
