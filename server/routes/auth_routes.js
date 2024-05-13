const express = require('express');
const User = require('../models/user.js');
const { JWT_SECRET } = require('../config.js');
const jwt = require('jsonwebtoken')
const ValidationError = require('mongoose/lib/error/validation.js')
const { MongoServerError } = require('mongodb/lib/error.js')

const router = express.Router();


const generateToken = (userId, email, role) => {
    return jwt.sign(
        {
            userId, email, role
        },
        JWT_SECRET,
        {
            expiresIn: '1d'
        })
}

// Route to register a new user
router.post('/register', async (req, res, next) => {
    try {
        // Create a new user
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            hashedPassword: req.body.password, // Password will be hashed in the pre-save hook
        });

        await newUser.save();

        const token = generateToken(newUser._id, newUser.email, newUser.role);

        res.status(200).json({ token });
    } catch (error) {
        if (error instanceof ValidationError) {
            const errors = []
            for (let o in error.errors) {
                errors.push(error.errors[o].message)
            }
            return res.status(400).json({ errors })
        }

        if (error instanceof MongoServerError) {
            return res.status(400).json({ message: "Email is already used" })
        }

        next(error)
    }
});

// Route to login
router.post('/login', async (req, res) => {
    try {
        // Find the user by email
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Compare the provided password with the hashed password stored in the database
        const isPasswordValid = await user.comparePassword(req.body.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Incorrect password' });
        }

        const token = generateToken(user._id, user.email, user.role);

        res.status(200).json({ token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
