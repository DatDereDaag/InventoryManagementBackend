const express = require("express");
const router = express.Router();

const userController = require("../controllers/users");

router.post("/login", userController.login_user);

router.post("/register", userController.register_user);

router.get("/", userController.get_users);

router.get("/:userID", userController.get_user_by_id);

router.delete("/:userID", userController.delete_user);

module.exports = router;
