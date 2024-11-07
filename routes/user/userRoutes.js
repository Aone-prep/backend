const express = require('express');
const authMiddleware = require('../../middlewares/authMiddleware');
const userController = require('../../controllers/user/userController');
const router = express.Router();


// Public Routes

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

// Protected Routes (requires authentication)
router.get('/info', authMiddleware, userController.getUserInfo);
router.put('/update-info', authMiddleware, userController.updateUserInfo);
router.post('/reset-password', authMiddleware, userController.resetPassword);
router.delete('/delete-account', authMiddleware, userController.deleteUser);

module.exports = router;