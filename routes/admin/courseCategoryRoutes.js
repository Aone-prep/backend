const express = require('express');
const router = express.Router();
const adminMiddleware = require('../../middlewares/adminMiddleware');
const courseCategoryController = require('../../controllers/admin/courseCategoryController');
// Course Category Routes
router.get('/categories', adminMiddleware, courseCategoryController.getAllCourseCategories);
router.get('/categories/:id', adminMiddleware,courseCategoryController.getCourseCategoryById);
router.post('/categories', adminMiddleware, courseCategoryController.createCourseCategory);
router.put('/categories/:id', adminMiddleware, courseCategoryController.updateCourseCategory);
router.delete('/categories/:id', adminMiddleware, courseCategoryController.deleteCourseCategory);
