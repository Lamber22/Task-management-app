import User from '../models/User.js';
import bcrypt from 'bcryptjs';

// Get User
export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); // Exclude password from response
        if (!user) {
            return res.status(404).json({
                status: 'Fail',
                message: 'User not found',
            });
        }
        res.status(200).json({
            status: 'Success',
            message: 'User retrieved successfully',
            data: user,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 'Error',
            message: 'Server error',
        });
    }
};

// Update User
export const updateUser = async (req, res) => {
    const { email, password } = req.body;
    const updates = {};

    if (email) updates.email = email;
    if (password) {
        const salt = await bcrypt.genSalt(10);
        updates.password = await bcrypt.hash(password, salt);
    }

    try {
        const user = await User.findByIdAndUpdate(req.user.id, updates,
            { new: true, runValidators: true }).select('-password');
        if (!user) {
            return res.status(404).json({
                status: 'Fail',
                message: 'User not found',
            });
        }
        res.status(200).json({
            status: 'Success',
            message: 'User updated successfully',
            data: user,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 'Error',
            message: 'Server error',
        });
    }
};

// Delete User
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.user.id);
        if (!user) {
            return res.status(404).json({
                status: 'Fail',
                message: 'User not found',
            });
        }
        res.status(200).json({
            status: 'Success',
            message: 'User deleted successfully',
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 'Error',
            message: 'Server error',
        });
    }
};
