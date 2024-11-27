const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../../models');

exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare the plain text password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user.id, username: user.username }, 'secretkey', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, username, email, password, role, status } = req.body;

    try {
        // Find user by primary key (id)
        const user = await User.findByPk(id);

        // If user not found, return 404 error
        if (!user) return res.status(404).json({ message: "User not found" });

        // If password is provided, hash it, otherwise keep the existing password
        const hashedPassword = password
            ? await bcrypt.hash(password, 10)
            : user.password;

        // Update user details
        await user.update({
            first_name,
            last_name,
            username,
            email,
            password: hashedPassword, // update password if provided
            role,
            status
        });

        // Respond with success message
        res.json({ message: "User updated successfully" });
    } catch (error) {
        // Handle errors during the update process
        res.status(500).json({ message: "Failed to update user info", error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        await user.destroy();
        res.json({ message: 'User account deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete user account', error: error.message });
    }
};
