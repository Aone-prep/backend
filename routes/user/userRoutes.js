const express = require('express');
const authMiddleware = require('../../middlewares/authMiddleware');
const userController = require('../../controllers/userController');
const router = express.Router();


// Public Routes
router.get('/', userController.welcomeMessage);
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

router.get('/info', authMiddleware, userController.getUserInfo);
router.put('/updateinfo', authMiddleware, userController.updateUserInfo);
router.post('/user/reset-password', authMiddleware, userController.resetPassword);
router.delete('/user', authMiddleware, userController.deleteUser);

module.exports= router;