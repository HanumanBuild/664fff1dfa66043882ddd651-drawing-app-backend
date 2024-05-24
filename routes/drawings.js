const express = require('express');
const jwt = require('jsonwebtoken');
const Drawing = require('../models/Drawing');
const User = require('../models/User');
const router = express.Router();

// Middleware to protect routes
const protect = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

// Save Drawing
router.post('/', protect, async (req, res) => {
    const { title, image } = req.body;
    try {
        const drawing = new Drawing({ user: req.user, title, image });
        await drawing.save();
        res.status(201).json({ message: 'Drawing saved successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get User's Drawings
router.get('/my-drawings', protect, async (req, res) => {
    try {
        const drawings = await Drawing.find({ user: req.user });
        res.json(drawings);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get All Drawings
router.get('/', async (req, res) => {
    try {
        const drawings = await Drawing.find().populate('user', 'username');
        res.json(drawings);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
