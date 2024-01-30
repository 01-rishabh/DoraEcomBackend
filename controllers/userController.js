const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
const createUser = async (req, res) => {
    try{
        const salt = await bcrypt.genSalt(10);

    let newUser = new User({
        displayName: req.body.displayName,
        email: req.body.email,
        passwordHash: await bcrypt.hashSync(req.body.password, salt),//using cryptography for hashing password
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,
        userImage: req.body.userImage
    })

        newUser = await newUser.save();
        if(!newUser){
          return  res.status(400).send('the user cannot be created!')
        }
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const updateUser = async (req, res) => {
    try{
        const userExist = await User.findById(req.params.id);
        let newPassword
        if(req.body.password){
            newPassword = bcrypt.hashSync(req.body.password, 10);
        } else {
            newPassword = userExist.passwordHash;
        }

        

    const newUser = await User.findByIdAndUpdate(req.params.id, {
        displayName: req.body.displayName,
        email: req.body.email,
        passwordHash: newPassword, //using cryptography for hashing password
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,
        userImage: req.body.userImage,
    },
        {new : true}
    )

        newUser = await newUser.save();
        if(!newUser){
           return res.status(400).send('the user cannot be updated!')
        }
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const loginUser = async(req, res) => {
    try{
        const user = await User.findOne({email: req.body.email});
        const secret = process.env.secret;
        if(!user){
            return res.status(400).send('The user not found');
        }

        if(user && bcrypt.compareSync(req.body.password, user.passwordHash)){
            const token = jwt.sign({
                userId : user._id,
                isAdmin: user.isAdmin
            }, secret,
            {
                expiresIn: '12h'
            }
            )

            return res.status(200).send({
                user: user.email, token: token
            })
        } else {
            return res.status(400).send('The password is wrong.')
        }

    } catch(error){
        console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    loginUser,
    createUser
    // deleteUser
};
