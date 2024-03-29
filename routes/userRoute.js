const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
// const authJwt = require('../helpers/jwt');

// router.use(authJwt)

// Get all users
router.get('/', userController.getAllUsers);

router.get('/:userId', userController.getUserById);
// Create a new user
router.post('/createUser', userController.createUser);

router.post('/login', userController.loginUser)
router.put('/update/:userId', userController.updateUser);

// Add more routes for updating and deleting users

module.exports = router;



