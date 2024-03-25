const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const product = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: "Category",
  },
  sku: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: String,
  },
  salePrice: {
    type: String,
  },
  costPrice: {
    type: String,
  },
  retailPrice: {
    type: String,
  },
  status: {
    type: String,
  },

  productImages: {
    type: Array,
    required: true,
  },
}, {
  toJSON: {
      transform: function (doc, ret) {
          // Rename _id to id
          ret.id = ret._id;
          delete ret._id;
          ret.colors= [
            { name: 'Breaker Bay', code: '#6AA39C' },
            { name: 'Malibu', code: '#6BDCFF' },
            { name: 'Purple Heart', code: '#5D30DD' },
            { name: 'Alizarin Crimson', code: '#D72222' },
            { name: 'Viola', code: '#C886A9' },
          ],
          ret.sizes = [6, 7, 8, 9, 10, 11],
          delete ret.__v; // Optionally remove __v field
      }
  }},
{
  timestamps: true
}
  );

module.exports = mongoose.model("Product", product);
