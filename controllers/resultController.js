const { Result } = require('../models');

// Get all results
exports.getAllResults = async (req, res) => {
    try {
        const results = await Result.findAll();
        res.json(results);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get result by ID
exports.getResultById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Result.findByPk(id);
        if (!result) return res.status(404).json({ message: 'Result not found' });
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Create a new result
exports.createResult = async (req, res) => {
    const { description, obtained_mark, pass_mark, full_mark, highest_mark } = req.body;
    try {
        const result = await Result.create({ description, obtained_mark, pass_mark, full_mark, highest_mark });
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update result by ID
exports.updateResult = async (req, res) => {
    const { id } = req.params;
    const { description, obtained_mark, pass_mark, full_mark, highest_mark } = req.body;
    try {
        const result = await Result.findByPk(id);
        if (!result) return res.status(404).json({ message: 'Result not found' });
        await result.update({ description, obtained_mark, pass_mark, full_mark, highest_mark });
        res.json({ message: 'Result updated successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete result by ID
exports.deleteResult = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Result.findByPk(id);
        if (!result) return res.status(404).json({ message: 'Result not found' });
        await result.destroy();
        res.json({ message: 'Result deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};