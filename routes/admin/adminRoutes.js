const express = require('express');
const router = express.Router();
const adminMiddleware = require('../../middlewares/adminMiddleware');
const courseCategoryController = require('../../controllers/admin/courseCategoryController');
const courseController= require('../../controllers/admin/courseController');
const adminController = require('../../controllers/admin/adminController');
const QuestionTypecontroller = require('../../controllers/admin/questionTypecontroller');


//getting token
router.post('/login', adminController.loginAdmin);

// Question Type Routes 
router.get ('/questionType',adminMiddleware, QuestionTypecontroller.getAllQuestionType);
router.get ('/questionType/:id',adminMiddleware, QuestionTypecontroller.getQuestionTypeById);
router.post ('/add-questionType',adminMiddleware, QuestionTypecontroller.createQuestionType);
router.put ('/questionType/:id',adminMiddleware, QuestionTypecontroller.updateQuestionType);
router.delete ('/questionType/:id',adminMiddleware, QuestionTypecontroller.deleteQuestionType);



// Course Category Routes
router.get('/categories', adminMiddleware, courseCategoryController.getAllCourseCategories);
router.get('/categories/:id', adminMiddleware,courseCategoryController.getCourseCategoryById);
router.post('/add-categories', adminMiddleware, courseCategoryController.createCourseCategory);
router.put('/categories/:id', adminMiddleware, courseCategoryController.updateCourseCategory);
router.delete('/categories/:id', adminMiddleware, courseCategoryController.deleteCourseCategory);


// Course Routes
router.get('/courses', adminMiddleware, courseController.getAllCourses);
router.get('/courses/:id', adminMiddleware,courseController.getCourseById);
router.post('/add-courses', adminMiddleware, courseController.createCourse);
router.put('/courses/:id', adminMiddleware, courseController.updateCourse);
router.delete('/courses/:id', adminMiddleware, courseController.deleteCourse);
module.exports=router;