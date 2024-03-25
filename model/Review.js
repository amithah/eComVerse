const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const review = new mongoose.Schema({
    reviewer_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'user'
      },
  
      message: {
        type: String
      },
  
      rating: {
        type: Number,
        required: true
      },
  
      product_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Product'
      },
    
}, {
    toJSON: {
        transform: function (doc, ret) {
            // Rename _id to id
            ret.id = ret._id;
            ret.products = "0";
            delete ret._id;
            delete ret.__v; // Optionally remove __v field
        }
    }},
    {
      timestamps: true
    }
    );
    review.plugin(mongoosePaginate);
module.exports = mongoose.model('Review',review);
