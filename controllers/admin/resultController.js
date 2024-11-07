const { Result, MockTest } = require('../../models');

// Get all results
exports.getAllResults = async (req, res) => {
    try {
        const results = await Result.findAll({
            include: [{
                model: MockTest,
                as: 'mockTests'  // Use the alias defined in the association
            }]
        
    });
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get result by ID
exports.getResultById = async (req, res) => {
    const resultId = req.params.id;
    try {
        const result = await Result.findOne({
            where: { id: resultId },
            include: [{
                model: MockTest,
                as: 'mockTests'  // This is the alias you defined in the association
              }]
        });
        
        if (!result) return res.status(404).json({ message: 'Result not found' });
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a result
exports.createResult = async (req, res) => {
    try {
        const { description, obtained_mark, pass_mark, full_mark, highest_mark, mockTestId } = req.body;

        // You can add validation logic here if needed

        const result = await Result.create({
            description, 
            obtained_mark, 
            pass_mark, 
            full_mark, 
            highest_mark,
        });

        res.json({ message: 'Result Created successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a result
exports.updateResult = async (req, res) => {
    try {
        const result = await Result.findByPk(req.params.id);
        if (!result) return res.status(404).json({ message: 'Result not found' });

        const { description, obtained_mark, pass_mark, full_mark, highest_mark, mockTestId } = req.body;
        await result.update({
            description, 
            obtained_mark, 
            pass_mark, 
            full_mark, 
            highest_mark,
            mockTestId // Ensure to update the mockTest association as well
        });

        res.json({ message: 'Result updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a result
exports.deleteResult = async (req, res) => {
    try {
        const result = await Result.findByPk(req.params.id);
        if (!result) return res.status(404).json({ message: 'Result not found' });

        await result.destroy();
        res.json({ message: 'Result deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
