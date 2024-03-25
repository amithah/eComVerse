const express = require("express");
const router = express.Router();
const categoryController = require("../controller/CategoryController");
const fileUploadController = require("../controller/fileUploadController");

router.route("/category").post(categoryController.create);
router.route("/category/:id").get(categoryController.get);
router.route("/category").get(categoryController.getAll);
router.route("/category/:id").put(categoryController.update);
router.route("/category/:id").delete(categoryController.remove);


module.exports = router;
