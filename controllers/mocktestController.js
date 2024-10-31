const { MockTest } = require('../models');

// Get all mock tests
exports.getAllMockTests = async (req, res) => {
    try {
        const mockTests = await MockTest.findAll();
        res.json(mockTests);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get mock test by ID
exports.getMockTestById = async (req, res) => {
    const { id } = req.params;
    try {
        const mockTest = await MockTest.findByPk(id);
        if (!mockTest) return res.status(404).json({ message: 'Mock Test not found' });
        res.json(mockTest);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Create a new mock test
exports.createMockTest = async (req, res) => {
    const { name, description, duration, max_score, result_id, status } = req.body;
    try {
        const mockTest = await MockTest.create({ name, description, duration, max_score, result_id, status });
        res.status(201).json(mockTest);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update mock test by ID
exports.updateMockTest = async (req, res) => {
    const { id } = req.params;
    const { name, description, duration, max_score, status } = req.body;
    try {
        const mockTest = await MockTest.findByPk(id);
        if (!mockTest) return res.status(404).json({ message: 'Mock Test not found' });
        await mockTest.update({ name, description, duration, max_score, status });
        res.json({ message: 'Mock Test updated successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete mock test by ID
exports.deleteMockTest = async (req, res) => {
    const { id } = req.params;
    try {
        const mocktest = await Mocktest.findByPk(id);
        if (!mocktest) return res.status(404).json({ message: 'Mock test not found' });
        await mocktest.destroy();
        res.json({ message: 'Mock test deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};