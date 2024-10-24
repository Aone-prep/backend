const { UserTest } = require('../models');

// Get all user tests
exports.getAllUserTests = async (req, res) => {
    try {
        const userTests = await UserTest.findAll();
        res.json(userTests);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get user test by ID
exports.getUserTestById = async (req, res) => {
    const { id } = req.params;
    try {
        const userTest = await UserTest.findByPk(id);
        if (!userTest) return res.status(404).json({ message: 'User Test not found' });
        res.json(userTest);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Create a new user test
exports.createUserTest = async (req, res) => {
    const { course_id, user_id, mocktest_id } = req.body;
    try {
        const userTest = await UserTest.create({ course_id, user_id, mocktest_id });
        res.status(201).json(userTest);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update user test by ID
exports.updateUserTest = async (req, res) => {
    const { id } = req.params;
    const { course_id, mocktest_id } = req.body;
    try {
        const userTest = await UserTest.findByPk(id);
        if (!userTest) return res.status(404).json({ message: 'User Test not found' });
        await userTest.update({ course_id, mocktest_id });
        res.json({ message: 'User Test updated successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete user test by ID
exports.deleteUserTest = async (req, res) => {
    const { id } = req.params;
    try {
        const userTest = await UserTest.findByPk(id);
        if (!userTest) return res.status(404).json({ message: 'User Test not found' });
        await userTest.destroy();
        res.json({ message: 'User Test deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};