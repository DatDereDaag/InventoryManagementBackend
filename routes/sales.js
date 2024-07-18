const express = require("express");
const router = express.Router();

const SalesController = require("../controllers/sales.js");

router.get("/", SalesController.get_all);

router.get("/:saleID", SalesController.get_sale);

router.post("/", SalesController.create_sale);

router.patch("/:saleID", SalesController.update_sale);

router.delete("/:saleID", SalesController.delete_sale);

module.exports = router;
