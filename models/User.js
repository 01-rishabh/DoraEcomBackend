const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    
    uid: { type: String, required: true },

    name: {
       type: String,
       required: true,
       trim: true,
       lowercase: true
     },

    email: {
       type: String,
       required: true,
       unique: true,
       lowercase: true,
         validate( value ) {
               if( !validator.isEmail( value )) {
                    throw new Error('Email is invalid')
                     }
                }
      },

    userImage: { type: String }
    
    }, 
    {
    timestamps: true
    })

    const User  = mongoose.model('User', userSchema);

    module.exports = User;