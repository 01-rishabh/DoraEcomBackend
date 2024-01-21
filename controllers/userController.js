const User = require('../models/User');

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new user
const createUser = async (req, res) => {
    const { uid, displayName, email, userImage } = req.body;

    try {
        const newUser = new User({
            uid,
            displayName,
            email,
            userImage,
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Add more controller functions for updating and deleting users

module.exports = {
    getAllUsers,
    createUser,
};
