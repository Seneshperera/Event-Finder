const Event = require('../models/Event');

// @route   GET /api/events
// @desc    Get all events or filtered by query
// @access  Public
exports.getEvents = async (req, res) => {
  try {
    let query = {};
    
    // Search by text
    if (req.query.search) {
      query = { $text: { $search: req.query.search } };
    }
    
    // Filter by category
    if (req.query.category) {
      query.category = req.query.category;
    }
    
    // Filter by location
    if (req.query.location) {
      query.location = { $regex: req.query.location, $options: 'i' };
    }
    
    // Filter by date range
    if (req.query.startDate && req.query.endDate) {
      query.date = {
        $gte: new Date(req.query.startDate),
        $lte: new Date(req.query.endDate)
      };
    }

    const events = await Event.find(query)
      .populate('organizer', 'name email')
      .sort({ date: 1 });

    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   GET /api/events/:id
// @desc    Get event by ID
// @access  Public
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('organizer', 'name email')
      .populate('attendees', 'name');

    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    res.json(event);
  } catch (err) {
    console.error(err.message);
    
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Event not found' });
    }
    
    res.status(500).send('Server error');
  }
};

// @route   POST /api/events
// @desc    Create a new event
// @access  Private
exports.createEvent = async (req, res) => {
  const {
    title,
    description,
    location,
    date,
    time,
    category,
    imageUrl
  } = req.body;

  try {
    const newEvent = new Event({
      title,
      description,
      location,
      date,
      time,
      category,
      imageUrl,
      organizer: req.user.id
    });

    const event = await newEvent.save();
    res.status(201).json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   PUT /api/events/:id
// @desc    Update an event
// @access  Private
exports.updateEvent = async (req, res) => {
  const {
    title,
    description,
    location,
    date,
    time,
    category,
    imageUrl
  } = req.body;

  // Build event object
  const eventFields = {};
  if (title) eventFields.title = title;
  if (description) eventFields.description = description;
  if (location) eventFields.location = location;
  if (date) eventFields.date = date;
  if (time) eventFields.time = time;
  if (category) eventFields.category = category;
  if (imageUrl) eventFields.imageUrl = imageUrl;

  try {
    let event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    // Check user is event organizer
    if (event.organizer.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // Update
    event = await Event.findByIdAndUpdate(
      req.params.id,
      { $set: eventFields },
      { new: true }
    );

    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   DELETE /api/events/:id
// @desc    Delete an event
// @access  Private
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    // Check user is event organizer
    if (event.organizer.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Event.deleteOne({ _id: req.params.id });

    res.json({ msg: 'Event removed' });
  } catch (err) {
    console.error(err.message);
    
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Event not found' });
    }
    
    res.status(500).send('Server error');
  }
};

// @route   PUT /api/events/:id/attend
// @desc    Attend an event
// @access  Private
exports.attendEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    // Check if user is already attending
    if (event.attendees.some(attendee => attendee.toString() === req.user.id)) {
      return res.status(400).json({ msg: 'Already attending this event' });
    }

    event.attendees.push(req.user.id);
    await event.save();

    res.json(event.attendees);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   PUT /api/events/:id/unattend
// @desc    Unattend an event
// @access  Private
exports.unattendEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    // Check if user is attending
    if (!event.attendees.some(attendee => attendee.toString() === req.user.id)) {
      return res.status(400).json({ msg: 'Not attending this event' });
    }

    // Remove user from attendees
    event.attendees = event.attendees.filter(
      (attendee) => attendee.toString() !== req.user.id
    );
    
    await event.save();

    res.json(event.attendees);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};