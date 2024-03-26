const Order = require("../model/Order");
const logger = require("../config/logger");
const { JWT } = require("../config/authContants");
const jwt = require('jsonwebtoken');
const { default: mongoose } = require("mongoose");

const create = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Authorization token not found' });
    }
    const decodedToken = jwt.verify(token,JWT.SECRET);

    const user = decodedToken.id;

    const {
      orderItems,total,customer,country,billingAddress,shippingAddress,sameShippingAddress,shippingMethod,paymentMethod,shippingSpeed,cardPayment,deliveryTime,paymentGateway,paymentSubGateway,verifiedResponse,coupon,note,payableAmount,useWallet

    } = req.body;

    const order = new Order({
      orderItems,
      total,
      customer:user,
      country,
      billingAddress,shippingAddress,sameShippingAddress,shippingMethod,paymentMethod,shippingSpeed,cardPayment,deliveryTime,paymentGateway,paymentSubGateway,verifiedResponse,coupon,note,payableAmount,useWallet
    });

    await order.save();

    return res.status(201).json({
      data: order,
    });
  } catch (error) {
    logger.error(error.message);
    return res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const orderId = req.params.id;
    const updates = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(orderId, updates, { new: true });

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json({
      data: updatedOrder,
    });
  } catch (error) {
    logger.error(error.message);
    return res.status(500).json({ error: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('customer');
    return res.status(200).json({
      data: orders,
    });
  } catch (error) {
    logger.error(error.message);
    return res.status(500).json({ error: error.message });
  }
};

const get = async (req, res) => {
  try {
    const order = await Order.findOne({_id:new mongoose.Types.ObjectId(req.params.id)}).populate('customer');
    return res.status(200).json({
      data: order
    });
  } catch (error) {
    logger.error(error.message);
    return res.status(401).json({ data: error.message });
  }
};
module.exports = {
  create,
  getAll,
  get,
  update,
};
