const Product = require("../model/Product");
const authService = require("../services/auth");
const { JWT } = require("../config/authContants");
const bcrypt = require("bcrypt");

const logger = require("../config/logger");
const { default: mongoose } = require("mongoose");
const create = async (req, res) => {
  try {
    const { title,categories,sku,description, price,salePrice,costPrice,retailPrice, productImages = [] } = req.body;
    const product = new Product({ title,category: new mongoose.Types.ObjectId(categories),sku,description, price,salePrice, costPrice,retailPrice,productImages });

    await product.save();
    return res.status(200).json({
      data: product,
    });
  } catch (error) {
    logger.error(error.message);
    return res.status(401).json({ data: error.message });
  }
};
const update = async (req, res) => {
  try {
    const product = await Product.find({ _id: req.params.id });
    const { title,categories,sku,description,price,salePrice,costPrice,retailPrice, productImages  } = req.body;
    let updatedItem = await Product.findOneAndUpdate(
      { _id: req.params.id },
      {  title,sku,description,costPrice,retailPrice, price,salePrice, productImages }
    );
    if (!product) {
      return res.recordNotFound();
    }
    return res.status(200).json({
      data: updatedItem,
    });
  } catch (error) {
    logger.error(error.message);
    return res.status(401).json({ data: error.message });
  }
};
const getAll = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json({
      data: products,
    });
  } catch (error) {
    logger.error(error.message);
    return res.status(401).json({ data: error.message });
  }
};
const get = async (req, res) => {
  try {
    const product = await Product.findOne({_id:new mongoose.Types.ObjectId(req.params.id)});
    return res.status(200).json({
      data: product
    });
  } catch (error) {
    logger.error(error.message);
    return res.status(401).json({ data: error.message });
  }
};
const remove = async (req, res) => {
  try {
    // Find the category by ID and remove it
    const product = await Product.findOneAndDelete({ _id: req.params.id });

    if (!product) {
      // If category is not found, return 404
      return res.recordNotFound();
    }

    return res.status(200).json({
      message: "Product deleted successfully",
      data: product
    });
  } catch (error) {
    logger.error(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = {
  create,
  get,
  getAll,
  update,
  remove,
};
