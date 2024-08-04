const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { allowRoles } = require("../middleware/roles");

const SalesController = require("../controllers/sales.js");

router.get(
  "/",
  auth,
  allowRoles("admin", "manager", "employee"),
  SalesController.get_all
);

router.get(
  "/:saleID",
  auth,
  allowRoles("admin", "manager", "employee"),
  SalesController.get_sale
);

router.post(
  "/",
  auth,
  allowRoles("admin", "manager"),
  SalesController.create_sale
);

router.patch(
  "/:saleID",
  auth,
  allowRoles("admin", "manager"),
  SalesController.update_sale
);

router.delete(
  "/:saleID",
  auth,
  allowRoles("admin", "manager"),
  SalesController.delete_sale
);

module.exports = router;
