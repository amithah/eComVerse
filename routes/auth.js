const express = require("express");
const router = express.Router();

const authController = require("../controller/AuthController");

// const authMiddleware = require("../middleware/auth");

router.route("/register").post(authController.register);
router.route("/login").post(authController.login);
router.route("/me").get(authController.getProfile);


module.exports = router;
