const Order = require("../model/Order");
const logger = require("../config/logger");
const { JWT } = require("../config/authContants");
const jwt = require('jsonwebtoken');

const create = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Authorization token not found' });
    }
    const decodedToken = jwt.verify(token,JWT.SECRET);

    const user = decodedToken.id;

    const {
      orderItems,
      customer,
      country,
      billing_address,
      shipping_address,
      delivery_time,
      payment_gateway,
      payment_sub_gateway,
      customer_contact,
      customer_name,
      verified_response,
      coupon,
      note,
      payable_amount,
      use_wallet,
      phone_no
    } = req.body;

    const order = new Order({
      orderItems,
      customer:user,
      country,
      billing_address,
      shipping_address,
      delivery_time,
      payment_gateway,
      payment_sub_gateway,
      customer_contact,
      customer_name,
      verified_response,
      coupon,
      note,
      payable_amount,
      use_wallet,
      phone_no
    });
console.log(order)
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

const get = async (req, res) => {
  try {
    const orders = await Order.find({});
    return res.status(200).json({
      data: orders,
    });
  } catch (error) {
    logger.error(error.message);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  create,
  get,
  update,
};
