const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({

    displayName: {
       type: String,
       required: true
     },

    email: {
       type: String,
       required: true,
       unique: true,
      },
    password: {
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
    });

    userSchema.pre("save", async function(next){
      const salt = await bcrypt.genSaltSync(10);
      this.password = await bcrypt.hash(this.password, salt);
    });

    userSchema.methods.isPasswordMatched = async function(enteredPassword){
      return await bcrypt.compare(enteredPassword, this.password);
    }

    const User  = mongoose.model('User', userSchema);

    module.exports = User;