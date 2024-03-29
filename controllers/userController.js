const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const generateToken = require('../helpers/jwtToken')

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-passwordHash');
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getUserById = async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await User.findById(userId).select('-passwordHash'); //using hash password

        if(!user){
            return res.status(400).send('The user cannot be found!');
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new user
const createUser = asyncHandler(async (req, res) => {
    /**
     * TODO:Get the email from req?.body?
     */
    const email = req?.body?.email;
    /**
     * TODO:With the help of email find the user exists or not
     */
    const findUser = await User.findOne({ email: email });
  
    if (!findUser) {
      /**
       * TODO:if user not found user create a new user
       */
      const newUser = await User.create(req.body);
      res.json(newUser);
    } else {
      /**
       * TODO:if user found then thow an error: User already exists
       */
      throw new Error("User Already Exists");
    }
  });

// const updateUser = async (req, res) => {
//     try{
//         const userExist = await User.findById(req.params.id);
//         let newPassword
//         if(req?.body?.password){
//             newPassword = bcrypt.hashSync(req?.body?.password, 10);
//         } else {
//             newPassword = userExist.passwordHash;
//         }


//     let newUser = await User.findByIdAndUpdate(req.params.id, {
//         displayName: req?.body?.displayName,
//         email: req?.body?.email,
//         passwordHash: newPassword, //using cryptography for hashing password
//         phone: req?.body?.phone,
//         isAdmin: req?.body?.isAdmin,
//         street: req?.body?.street,
//         apartment: req?.body?.apartment,
//         zip: req?.body?.zip,
//         city: req?.body?.city,
//         country: req?.body?.country,
//         userImage: req?.body?.userImage,
//     },
//         {new : true}
//     )

//         // newUser = await newUser.save();
//         if(!newUser){
//            return res.status(400).send('The user not found in the context!')
//         }
//         let updatedUser = await newUser.save(); // Saving newUser only if it's not null

//         if (!updatedUser) {
//             return res.status(400).send('Error occurred while saving updated user!');
//         }
//         res.status(201).json(newUser);
//     } catch (error) {
//        throw new Error(error);
//     }
// };

// const updateUser = async (req, res) => {
//     try {
//         // Find the user by ID
//         const user = await User.findById(req.params.id);

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         // Update user fields based on request body
//         if (req?.body?.displayName) {
//             user.displayName = req?.body?.displayName;
//         }
//         if (req?.body?.email) {
//             user.email = req?.body?.email;
//         }
//         if (req?.body?.password) {
//             const hashedPassword = await bcrypt.hash(req?.body?.password, 10);
//             user.password = hashedPassword;
//         }
//         if (req?.body?.phone) {
//             user.phone = req?.body?.phone;
//         }
//         if (req?.body?.isAdmin !== undefined) {
//             user.isAdmin = req?.body?.isAdmin;
//         }
//         if (req?.body?.street) {
//             user.street = req?.body?.street;
//         }
//         if (req?.body?.apartment) {
//             user.apartment = req?.body?.apartment;
//         }
//         if (req?.body?.zip) {
//             user.zip = req?.body?.zip;
//         }
//         if (req?.body?.city) {
//             user.city = req?.body?.city;
//         }
//         if (req?.body?.country) {
//             user.country = req?.body?.country;
//         }
//         if (req?.body?.userImage) {
//             user.userImage = req?.body?.userImage;
//         }

//         // Save the updated user
//         const updatedUser = await user.save();

//         res.status(200).json(updatedUser);
//     } catch (error) {
//         console.error('Error updating user:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };


const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // check if user exists or not
    const findUser = await User.findOne({ email });
    if (findUser && (await findUser.isPasswordMatched(password))) {
      //const refreshToken = await generateRefreshToken(findUser?._id);
    //   const updateuser = await User.findByIdAndUpdate(
    //     findUser.id,
    //     {
    //       refreshToken: refreshToken,
    //     },
    //     { new: true }
    //   );
    //   res.cookie("refreshToken", refreshToken, {
    //     httpOnly: true,
    //     maxAge: 72 * 60 * 60 * 1000,
    //   });
      res.json({
        _id: findUser?._id,
        displayName: findUser?.displayName,
        email: findUser?.email,
        mobile: findUser?.mobile,
        token: generateToken(findUser?._id),
      });
    } else {
      throw new Error("Invalid Credentials");
    }
  });
  

  const updateUser = asyncHandler(async(req, res) => {
      const {id} = req.params;
    try{

    let afterUpdate = await User.findByIdAndUpdate(id,{
        displayName: req?.body?.displayName,
        email: req?.body?.email,
        //passwordHash: newPassword, //using cryptography for hashing password
        phone: req?.body?.phone,
        isAdmin: req?.body?.isAdmin,
        street: req?.body?.street,
        apartment: req?.body?.apartment,
        zip: req?.body?.zip,
        city: req?.body?.city,
        country: req?.body?.country,
        userImage: req?.body?.userImage,
    },{new: true})

    if(!afterUpdate){
        return res.status(400).send('The user not found in the context!')
    }
    let updatedUser = await afterUpdate.save(); // Saving newUser only if it's not null
    if (!updatedUser) {
        return res.status(400).send('Error occurred while saving updated user!');
    }
    res.status(201).json(newUser);
    } catch(error){
        throw new Error(error);
    }
    
  })


module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    loginUser,
    createUser
    // deleteUser
};
