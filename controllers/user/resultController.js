const { Result, MockTest } = require('../..models');

// Get all results for the logged-in user
exports.getUserResults = async (req, res) => {
    const userId = req.user.id; // Assuming user ID is in the JWT token (authenticated user)
    try {
        const results = await Result.findAll({
            where: { userId: userId }, // Filter results by the user ID
            include: [{
                model: MockTest,
                as: 'mockTests' // Include associated mock tests if available
            }]
        });
        if (!results || results.length === 0) {
            return res.status(404).json({ message: 'No results found for this user' });
        }
        res.json(results);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get result by ID for the logged-in user
exports.getUserResultById = async (req, res) => {
    const userId = req.user.id; // Get the user ID from JWT token
    const { id } = req.params;  // Get the result ID from the request params
    try {
        const result = await Result.findOne({
            where: {
                id: id,
                userId: userId  // Ensure the result belongs to the authenticated user
            },
            include: [{
                model: MockTest,
                as: 'mockTests' // Include associated mock test if available
            }]
        });

        if (!result) {
            return res.status(404).json({ message: 'Result not found for this user' });
        }
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Create a new result for the logged-in user
exports.createUserResult = async (req, res) => {
    const userId = req.user.id; // Get the user ID from JWT token
    const { description, obtained_mark, pass_mark, full_mark, highest_mark } = req.body;
    try {
        const result = await Result.create({
            description,
            obtained_mark,
            pass_mark,
            full_mark,
            highest_mark,
            userId  // Store the user ID to associate the result with the user
        });
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a result by ID for the logged-in user
exports.updateUserResult = async (req, res) => {
    const userId = req.user.id; // Get the user ID from JWT token
    const { id } = req.params; // Get the result ID from the request params
    const { description, obtained_mark, pass_mark, full_mark, highest_mark } = req.body;
    try {
        const result = await Result.findOne({
            where: {
                id: id,
                userId: userId // Ensure the result belongs to the authenticated user
            }
        });

        if (!result) {
            return res.status(404).json({ message: 'Result not found for this user' });
        }

        await result.update({
            description,
            obtained_mark,
            pass_mark,
            full_mark,
            highest_mark
        });

        res.json({ message: 'Result updated successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a result by ID for the logged-in user
exports.deleteUserResult = async (req, res) => {
    const userId = req.user.id; // Get the user ID from JWT token
    const { id } = req.params; // Get the result ID from the request params
    try {
        const result = await Result.findOne({
            where: {
                id: id,
                userId: userId // Ensure the result belongs to the authenticated user
            }
        });

        if (!result) {
            return res.status(404).json({ message: 'Result not found for this user' });
        }

        await result.destroy();
        res.json({ message: 'Result deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};