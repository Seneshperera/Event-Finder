const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const auth = require('../middleware/auth');

// @route   GET /api/events
// @desc    Get all events or filtered by query
router.get('/', eventController.getEvents);

// @route   GET /api/events/:id
// @desc    Get event by ID
router.get('/:id', eventController.getEventById);

// @route   POST /api/events
// @desc    Create a new event
router.post('/', auth, eventController.createEvent);

// @route   PUT /api/events/:id
// @desc    Update an event
router.put('/:id', auth, eventController.updateEvent);

// @route   DELETE /api/events/:id
// @desc    Delete an event
router.delete('/:id', auth, eventController.deleteEvent);

// @route   PUT /api/events/:id/attend
// @desc    Attend an event
router.put('/:id/attend', auth, eventController.attendEvent);

// @route   PUT /api/events/:id/unattend
// @desc    Unattend an event
router.put('/:id/unattend', auth, eventController.unattendEvent);

module.exports = router;