// controllers/authController.js
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';

// Register User
export const register = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        user = new User({ email, password });
        await user.save();

        res.status(201).json({
            status: 'Success',
            message: 'User registered successfully',
            data: user,
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

// Login User
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user._id);  // Use generateToken function
        res.status(200).json({
            status: 'Success',
            message: 'User logged in successfully',
            token: token
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// user logOut handler
export const logOut = async (req, res) => {
    try {
        res.clearCookie("token");
        res
        .status(200)
        .json({ status: "success", message: "User signed out successfully" });
    } catch (error) {
        res
        .status(500)
        .json({ error: "Server error", errorMessage: error.message });
    }
};
