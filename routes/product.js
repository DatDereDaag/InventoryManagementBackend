const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { allowRoles } = require("../middleware/roles");

const ProductController = require("../controllers/product.js");

router.get(
  "/",
  auth,
  allowRoles("admin", "manager", "employee"),
  ProductController.get_all
);

router.get(
  "/:productID",
  auth,
  allowRoles("admin", "manager", "employee"),
  ProductController.get_product
);

router.post(
  "/",
  auth,
  allowRoles("admin", "manager"),
  ProductController.create_product
);

router.patch(
  "/:productID",
  auth,
  allowRoles("admin", "manager"),
  ProductController.update_product
);

router.delete(
  "/:productID",
  auth,
  allowRoles("admin", "manager"),
  ProductController.delete_product
);

module.exports = router;
