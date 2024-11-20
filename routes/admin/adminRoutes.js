const express = require('express');
const router = express.Router();
const adminMiddleware = require('../../middlewares/adminMiddleware');
const courseCategoryController = require('../../controllers/admin/courseCategoryController');
const courseController= require('../../controllers/admin/courseController');
const adminController = require('../../controllers/admin/adminController');
const QuestionTypecontroller = require('../../controllers/admin/questionTypecontroller');
const mocktestController = require('../../controllers/admin/mocktestController');
const questionController = require('../../controllers/admin/questionsController');
const contentController = require('../../controllers/admin/contentController');

//getting token
router.post('/login', adminController.loginAdmin);

//Content Routes 
router.put('/contents/:contentId',adminMiddleware, contentController.updateContent);
router.post('/contents', adminMiddleware,contentController.createContent);
router.delete('/contents/:contentId', adminMiddleware,contentController.deleteContent);
// Question Routes

router.post('/questions',  adminMiddleware, questionController.createQuestion);
router.put('/questions/:id',  adminMiddleware, questionController.updateQuestion);
router.delete('/questions/:id',  adminMiddleware, questionController.deleteQuestion);

// Mock Test Routes

router.post('/mocktests', adminMiddleware, mocktestController.createMockTest);
router.put('/mocktests/:id', adminMiddleware, mocktestController.updateMockTest);
router.delete('/mocktests/:id', adminMiddleware, mocktestController.deleteMockTest);


// Question Type Routes 

router.post ('/questionType',adminMiddleware, QuestionTypecontroller.createQuestionType);
router.put ('/questionType/:id',adminMiddleware, QuestionTypecontroller.updateQuestionType);
router.delete ('/questionType/:id',adminMiddleware, QuestionTypecontroller.deleteQuestionType);



// Course Category Routes

router.post('/categories', adminMiddleware, courseCategoryController.createCourseCategory);
router.put('/categories/:id', adminMiddleware, courseCategoryController.updateCourseCategory);
router.delete('/categories/:id', adminMiddleware, courseCategoryController.deleteCourseCategory);


// Course Routes

router.post('/courses', adminMiddleware, courseController.createCourse);
router.put('/courses/:id', adminMiddleware, courseController.updateCourse);
router.delete('/courses/:id', adminMiddleware, courseController.deleteCourse);
module.exports=router;