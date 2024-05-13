const mongoose = require("../db");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"], // Ensure name is not empty
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email already taken"], // Ensure email is unique
        match: [ // Validate email format using regex pattern
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please enter a valid email address"
        ]
    },
    hashedPassword: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"] // Validate password length
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
});

// Middleware to hash the password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('hashedPassword')) return next();

    try {
        const hashedPassword = await bcrypt.hash(this.hashedPassword, 10);
        this.hashedPassword = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare password
userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.hashedPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
