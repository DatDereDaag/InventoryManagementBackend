const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { allowRoles } = require("../middleware/roles");

const userController = require("../controllers/users");

router.post("/login", userController.login_user);

router.post("/register", userController.register_user);

router.get("/", auth, allowRoles("admin"), userController.get_users);

router.get(
  "/:userID",
  auth,
  allowRoles("admin"),
  userController.get_user_by_id
);

router.delete(
  "/:userID",
  auth,
  allowRoles("admin"),
  userController.delete_user
);

module.exports = router;
