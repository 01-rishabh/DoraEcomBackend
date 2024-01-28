const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
// const authJwt = require('../helpers/jwt');

// router.use(authJwt)

// Get all users
router.get('/', userController.getAllUsers);

// Create a new user
router.post('/', userController.createUser);

router.post('/login', userController.loginUser)

// Add more routes for updating and deleting users

module.exports = router;
