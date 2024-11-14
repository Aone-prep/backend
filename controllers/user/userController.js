const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../../models');


// Register User
exports.registerUser = async (req, res) => {
    const { first_name, last_name, username, email, password } = req.body;
    try {
        // Check if username or email already exists
        const existingUser = await User.findOne({ where: { username } }) || await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            first_name,
            last_name,
            username,
            email,
            password: hashedPassword,
            role: 'user',
            status: '1'
        });
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Registration failed', error: error.message });
    }
};
// Login User
exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ where: { username } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET || 'secretkey', { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
};

// Get User Info (Protected)
exports.getUserInfo = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, { attributes: { exclude: ['password'] } });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch user info', error: error.message });
    }
};


// Update User Info (Protected)
exports.updateUserInfo = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findByPk(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const hashedPassword = password ? await bcrypt.hash(password, 10) : user.password;
        await user.update({ email, password: hashedPassword });
        res.json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update user info', error: error.message });
    }
};

// Reset Password (Protected)
exports.resetPassword = async (req, res) => {
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
        res.status(500).json({ message: 'Failed to reset password', error: error.message });
    }
};


exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        await user.destroy();
        res.json({ message: 'User account deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete user account', error: error.message });
    }
};