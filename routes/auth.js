const express = require("express");
const router = express.Router();

const authController = require("../controller/authController");

// const authMiddleware = require("../middleware/auth");

router.route("/register").post(authController.register);
router.route("/login").post(authController.login);
router.route("/me").post(authController.getProfile);


module.exports = router;
