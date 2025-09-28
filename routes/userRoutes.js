const express = require('express');
const { loginUser, registerUser, getUserProfile } = require('../controllers/userController');
const validateTokenHandler = require('../middleware/validateTokenHandler');
const router = express.Router();

// @route   POST /api/users/login
// @desc    Login user
// @access  Public
router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/current', validateTokenHandler, getUserProfile);

module.exports = router;