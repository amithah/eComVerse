const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderItems: [],
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  country: {
    type: String,
  },
  billingAddress: {

  },
  shippingAddress: {

  },
  sameShippingAddress: {

  },
  shippingMethod:{},
  paymentMethod:{},
  shippingSpeed:{},
  cardPayment:{},
  deliveryTime: {
    type: String,
  },
  paymentGateway: {
    type: String,
  },
  paymentSubGateway: {
    type: String,
  },

  verifiedResponse: {
    type: String,
  },
  coupon: {
    type: String,
  },
  note: {
    type: String,
  },
  payableAmount: {
    type: String,
  },
  useWallet: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'shipped', 'delivered'],
    default: 'pending'
  },
  total:{}
}, {
  timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
