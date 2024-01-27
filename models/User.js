const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    displayName: {
       type: String,
       required: true,
       trim: true
     },

    email: {
       type: String,
       required: true,
       unique: true,
      //  lowercase: true,
      //    validate( value ) {
      //          if( !validator.isEmail( value )) {
      //               throw new Error('Email is invalid')
      //                }
      //           }
      },
    passwordHash: {
        type: String,
        require: true
      },
      phone: { type: Number, require: true },
      isAdmin:{
        type: Boolean,
        default: false
      },  
    street: {
      type: String, default: ''
      },
    apartment: {
      type: String, default: ''
    },
    zip: { type: String, default: '' },
    city: {
      type: String, default: ''
    },
  country: { type: String, default: '' },
    userImage: { type: String }
    
}, 
    {
    timestamps: true
    })

    const User  = mongoose.model('User', userSchema);

    module.exports = User;