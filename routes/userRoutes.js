const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const router = express.Router();

router.get('/', async (req,res) => {
  res.json({ message: 'Welcome to the API!' });
    
});

// Register
router.post('/register', async (req, res) => {
    const { username, email, password, role = 'user' } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashedPassword });
        res.json({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ where: { username } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user.id, username: user.username }, 'secretkey', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get User Info (Protected)
router.get('/user', authMiddleware, async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update User Info (Protected)
router.put('/user', authMiddleware, async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findByPk(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        const hashedPassword = password ? await bcrypt.hash(password, 10) : user.password;
        await user.update({ email, password: hashedPassword });
        res.json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Reset Password (Protected)
router.post('/user/reset-password', authMiddleware, async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    try {
        const user = await User.findByPk(req.user.id);
        if (!user || !(await bcrypt.compare(oldPassword, user.password))) {
            return res.status(400).json({ message: 'Incorrect old password' });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await user.update({ password: hashedPassword });
        res.json({ message: 'Password reset successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete User (Protected)
router.delete('/user', authMiddleware, async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        await user.destroy();
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Admin: Get All Users (Protected, Admin Only)
router.get('/admin/users', [authMiddleware, adminMiddleware], async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Admin: Delete Any User (Protected, Admin Only)
router.delete('/admin/user/:id', [authMiddleware, adminMiddleware], async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        await user.destroy();
        res.json({ message: 'User deleted successfully by admin' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
