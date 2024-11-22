const express = require('express');
const authMiddleware = require('../../middlewares/authMiddleware');

const userController = require('../../controllers/user/userController');

const courseCategoryController = require('../../controllers/admin/courseCategoryController');
const courseController= require('../../controllers/admin/courseController');
// const adminController = require('../../controllers/admin/adminController');
const QuestionTypecontroller = require('../../controllers/admin/questionTypecontroller');
const mocktestController = require('../../controllers/admin/mocktestController');
const questionController = require('../../controllers/admin/questionsController');

const mockTestController = require('../../controllers/user/submitMockTestResult'); // Update the path based on your project structure
const contentController = require('../../controllers/admin/contentController');
const userCourseController = require('../../controllers/user/userCourseController');
const router = express.Router();


// Public Routes

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);


// Protected Routes (requires authentication)

//


router.get('/progress',userCourseController.incrementInProgress);
router.post('/start',userCourseController.createUserCourse);


// User Routes

router.get('/info', authMiddleware, userController.getUserInfo);
router.put('/update-info', authMiddleware, userController.updateUserInfo);
router.post('/reset-password', authMiddleware, userController.resetPassword);
//router.delete('/delete-account', authMiddleware, userController.deleteUser);

router.get('/all', userController.getAllUsers);



// Conetent Routes
router.get('/contents', contentController.getAllContent);
router.get('/contents/:contentId', contentController.getContentById);

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



// Submit the result for a mock test (POST route)
router.post('/submit', authMiddleware, mockTestController.submitMockTestResult);

module.exports= router;
