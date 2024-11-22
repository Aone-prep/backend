const { incrementInProgress, createUserCourse } = require('../../controllers/user/userCourseController');
const { UserCourse, Content, Course } = require('../../models');

const mockResponse = () => {
  const res = {};
  res.json = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  return res;
};

const mockRequest = (body = {}) => {
  return { body };
};

jest.mock('../../models');  // Mock the UserCourse, Course, and Content models

describe('Course Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test for incrementInProgress
  describe('incrementInProgress', () => {
    it('should update progress to the next content', async () => {
      // Arrange
      const courseData = {
        id: 1,
        user_id: 1,
        progress: 1,
        course_id: 1,
      };
      UserCourse.findOne.mockResolvedValue(courseData);  // Mock the course with content
      const req = mockRequest({ course_id: 1, direction: 'next', user_id: 1 });
      const res = mockResponse();

      // Act
      await incrementInProgress(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Course progress updated successfully',
        course: expect.objectContaining({ progress: 2 }),
        contentCount: 2
      });
    });

    it('should return an error if no more contents to progress to', async () => {
      // Arrange
      const courseData = {
        id: 1,
        user_id: 1,
        progress: 2,
        course_id: 1,
        course: {
          id: 1,
          contents: [{ id: 1, title: 'Content 1' }, { id: 2, title: 'Content 2' }]
        }
      };
      UserCourse.findOne.mockResolvedValue(courseData);  // Mock the course with content
      const req = mockRequest({ course_id: 1, direction: 'next', user_id: 1 });
      const res = mockResponse();

      // Act
      await incrementInProgress(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'No more contents to progress to' });
    });

    it('should return an error if the direction is invalid', async () => {
      // Arrange
      const courseData = {
        id: 1,
        user_id: 1,
        progress: 1,
        course_id: 1,
        course: {
          id: 1,
          contents: [{ id: 1, title: 'Content 1' }, { id: 2, title: 'Content 2' }]
        }
      };
      UserCourse.findOne.mockResolvedValue(courseData);  // Mock the course with content
      const req = mockRequest({ course_id: 1, direction: 'invalid', user_id: 1 });
      const res = mockResponse();

      // Act
      await incrementInProgress(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid direction, use "next" or "previous"' });
    });

    it('should return 404 if user is not linked to the course', async () => {
      // Arrange
      UserCourse.findOne.mockResolvedValue(null);  // Simulate no course found
      const req = mockRequest({ course_id: 999, direction: 'next', user_id: 1 });
      const res = mockResponse();

      // Act
      await incrementInProgress(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'User is not linked with Course' });
    });

    it('should handle database errors', async () => {
      // Arrange
      UserCourse.findOne.mockRejectedValue(new Error('Database error'));
      const req = mockRequest({ course_id: 1, direction: 'next', user_id: 1 });
      const res = mockResponse();

      // Act
      await incrementInProgress(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'An error occurred while updating the progress' });
    });
  });

  // Test for createUserCourse
  describe('createUserCourse', () => {
    it('should create a new user-course association', async () => {
      // Arrange
      const newUserCourse = {
        user_id: 1,
        course_id: 1,
        comment: null,
        progress: 1,
        rating: 1,
        status: 'not_completed',
      };
      UserCourse.findByPk.mockResolvedValue(null);  // Simulate no existing user-course association
      UserCourse.create.mockResolvedValue(newUserCourse);
      const req = mockRequest({ user_id: 1, course_id: 1 });
      const res = mockResponse();

      // Act
      await createUserCourse(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Course started successfully',
        data: newUserCourse
      });
    });

    it('should return error if user is already assigned to the course', async () => {
      // Arrange
      const existingUserCourse = {
        user_id: 1,
        course_id: 1,
      };
      UserCourse.findByPk.mockResolvedValue(existingUserCourse);  // Simulate existing user-course association
      const req = mockRequest({ user_id: 1, course_id: 1 });
      const res = mockResponse();

      // Act
      await createUserCourse(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'user is already assigned with course' });
    });

    it('should return error if user_id or course_id is missing', async () => {
      // Arrange
      const req = mockRequest({ user_id: 1 });
      const res = mockResponse();

      // Act
      await createUserCourse(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'user_id and course_id are required' });
    });

    it('should handle errors during course creation', async () => {
      // Arrange
      UserCourse.findByPk.mockRejectedValue(new Error('Database error'));
      const req = mockRequest({ user_id: 1, course_id: 1 });
      const res = mockResponse();

      // Act
      await createUserCourse(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'An error occurred while starting the course' });
    });
  });
});
