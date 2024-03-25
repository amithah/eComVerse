const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const category = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    images:{
        type: Array,
    },
    description:{
        type: String,
    },
    slug:{
        type: String,
        required:true
    },
    
    
}, 
{
  timestamps: true
},{
    toJSON: {
        transform: function (doc, ret) {
            // Rename _id to id
            ret.id = ret._id;
            ret.products = "0";
            delete ret._id;
            delete ret.__v; // Optionally remove __v field
        }
    }}
    );
category.plugin(mongoosePaginate);
module.exports = mongoose.model('Category',category);
