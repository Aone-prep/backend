// Protected Routes (User)

const express = require('express');
const authMiddleware = require('../../middlewares/authMiddleware');
const userController = require('../../controllers/userController');
const router = express.Router();

router.get('/info', authMiddleware, userController.getUserInfo);
router.put('/updateinfo', authMiddleware, userController.updateUserInfo);
router.post('/user/reset-password', authMiddleware, userController.resetPassword);
router.delete('/user', authMiddleware, userController.deleteUser);

module.exports= router;