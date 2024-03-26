const express = require("express");
const router = express.Router();
const orderController = require("../controller/OrderController");

router.route("/order").post(orderController.create);
router.route("/order/:id").get(orderController.get);
router.route("/order").get(orderController.getAll);
router.route("/order/:id").put(orderController.update);

module.exports = router;
