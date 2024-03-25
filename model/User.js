const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const user = new mongoose.Schema({
    first_name:{
        type: String
    },
    last_name:{
        type: String
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password:{
        type: String,
        required:true
    }
},
{
  timestamps: true
});

module.exports = mongoose.model('User',user);
