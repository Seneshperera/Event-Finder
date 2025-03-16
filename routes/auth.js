const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
router.post('/login', authController.loginUser);

// @route   GET /api/auth/me
// @desc    Get current user
router.get('/me', auth, authController.getMe);

module.exports = router;