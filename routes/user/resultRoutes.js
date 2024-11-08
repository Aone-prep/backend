const express = require('express');
const authMiddleware = require('../../middlewares/authMiddleware'); // Assuming authMiddleware is in this path
const resultController = require('../../controllers/user/resultController'); // Update the path based on your project structure
const router = express.Router();

// Protected Routes (requires authentication)

// Get all results for the logged-in user
router.get('/results', authMiddleware, resultController.getUserResults);

// Get a specific result by ID for the logged-in user
router.get('/results/:id', authMiddleware, resultController.getUserResultById);

// Create a new result for the logged-in user
router.post('/results', authMiddleware, resultController.createUserResult);

// Update an existing result by ID for the logged-in user
router.put('/results/:id', authMiddleware, resultController.updateUserResult);

// Delete a result by ID for the logged-in user
router.delete('/results/:id', authMiddleware, resultController.deleteUserResult);

module.exports = router;