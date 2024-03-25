const express = require("express");
const router = express.Router();
const productController = require("../controller/ProductController");
const fileUploadController = require("../controller/fileUploadController");

router.route("/product").post(productController.create);
router.route("/product/:id").get(productController.get);
router.route("/product/:id").put(productController.update);
router.route("/product/").get(productController.getAll);
router.route("/product/:id").delete(productController.remove);

router.route("/upload").post(fileUploadController.upload);

module.exports = router;
