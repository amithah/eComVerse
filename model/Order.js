const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderItems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', // Reference to the Product model
    required: true
  }],
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  country: {
    type: String,
  },
  billing_address: {
    type: String,
  },
  shipping_address: {
    type: String,
  },
  delivery_time: {
    type: String,
  },
  payment_gateway: {
    type: String,
  },
  payment_sub_gateway: {
    type: String,
  },
  customer_contact: {
    type: String,
  },
  customer_name: {
    type: String,
  },
  verified_response: {
    type: String,
  },
  coupon: {
    type: String,
  },
  note: {
    type: String,
  },
  payable_amount: {
    type: String,
  },
  use_wallet: {
    type: Boolean,
    default: false
  },
  phone_no: {
    type: Array,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'shipped', 'delivered'],
    default: 'pending'
  }
}, {
  timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
