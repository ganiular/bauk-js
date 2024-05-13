const router = require('express').Router();
const { authorizeUserRole, authenticateUser } = require('../middlewares/auth.js');
const User = require('../models/user.js');
const ValidationError = require('mongoose/lib/error/validation.js')
const { MongoServerError } = require('mongodb/lib/error.js')
const bcrypt = require('bcryptjs')


router.post('/', authenticateUser, authorizeUserRole('admin'), async (req, res, next) => {
    try {
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            hashedPassword: req.body.password,
            role: req.body.role
        });

        await newUser.save();
        res.status(201).json(newUser);
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


router.get('/', async (req, res, next) => {
    const { role, email } = req.query;
    const query = {};
    const selectFields = { hashedPassword: 0 }; // Excluding 'hashedPassword' field

    if (role) {
        query.role = role;
    }

    try {
        if (email) {
            const user = await User.findOne({ email }).select(selectFields);
            res.json(user);
        } else {
            const users = await User.find(query).select(selectFields);
            res.json(users);
        }
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select({ hashedPassword: 0 });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        next(error);
    }
});

router.put('/', authenticateUser, async (req, res, next) => {
    const data = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    if (req.body.password) {
        data['hashedPassword'] = await bcrypt.hash(req.body.password, 10);
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(req.user.userId, data, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    } catch (error) {
        next(error);
    }
});

router.put('/:id', authenticateUser, authorizeUserRole('admin'), async (req, res, next) => {
    const data = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    if (req.body.password) {
        data['hashedPassword'] = await bcrypt.hash(req.body.password, 10);
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, data, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', authenticateUser, authorizeUserRole('admin'), async (req, res, next) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        next(error);
    }
});




module.exports = router;
