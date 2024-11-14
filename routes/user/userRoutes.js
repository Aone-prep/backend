const express = require('express');
const authMiddleware = require('../../middlewares/authMiddleware');
const userController = require('../../controllers/userController');
const courseCategoryController = require('../../controllers/admin/courseCategoryController');
const courseController= require('../../controllers/admin/courseController');
// const adminController = require('../../controllers/admin/adminController');
const QuestionTypecontroller = require('../../controllers/admin/questionTypecontroller');
const mocktestController = require('../../controllers/admin/mocktestController');
const questionController = require('../../controllers/admin/questionsController');
const router = express.Router();


// Public Routes
router.get('/', userController.welcomeMessage);
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);





// User Routes
router.get('/info', authMiddleware, userController.getUserInfo);
router.put('/updateinfo', authMiddleware, userController.updateUserInfo);
router.post('/user/reset-password', authMiddleware, userController.resetPassword);
router.delete('/user', authMiddleware, userController.deleteUser);

//questions 
router.get('/questions',questionController.getAllQuestions);
router.get('/questions/:id', questionController.getQuestionById);

//mocktest
router.get('/mocktests',mocktestController.getAllMockTests);
router.get('/mocktests/:id',mocktestController.getMockTestById);

//questionTypes
router.get ('/questionType', QuestionTypecontroller.getAllQuestionType);
router.get ('/questionType/:id', QuestionTypecontroller.getQuestionTypeById);

//Course-Category
router.get('/categories', courseCategoryController.getAllCourseCategories);
router.get('/categories/:id',courseCategoryController.getCourseCategoryById);

//course 
router.get('/courses', courseController.getAllCourses);
router.get('/courses/:id',courseController.getCourseById);
module.exports= router;