const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

// @route   POST /api/users
// @desc    Register a user
router.post('/', userController.registerUser);

// @route   PUT /api/users/favorites/:eventId
// @desc    Add event to favorites
router.put('/favorites/:eventId', auth, userController.addToFavorites);

// @route   DELETE /api/users/favorites/:eventId
// @desc    Remove event from favorites
router.delete('/favorites/:eventId', auth, userController.removeFromFavorites);

// @route   GET /api/users/favorites
// @desc    Get user's favorite events
router.get('/favorites', auth, userController.getFavorites);

module.exports = router;