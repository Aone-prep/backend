const { getAllCourses, getCourseById, createCourse, updateCourse, deleteCourse } = require('../../controllers/admin/courseController');
const { Course, CourseCategory } = require('../../models');

const mockResponse = () => {
  const res = {};
  res.json = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  return res;
};

const mockRequest = (params = {}, body = {}) => {
  return {
    params,
    body
  };
};

jest.mock('../../models');  // Mock the Course and CourseCategory models

describe('Course Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test for getAllCourses
  describe('getAllCourses', () => {
    it('should return all courses successfully', async () => {
      // Arrange
      const courses = [
        {
          id: 1,
          course_name: 'Course 1',
          description: 'Description of Course 1',
          duration: '30 hours',
          level: 'Beginner',
          category: { id: 1, name: 'Category 1' }
        }
      ];
      Course.findAll.mockResolvedValue(courses);  // Mock the model method
      const req = mockRequest();
      const res = mockResponse();

      // Act
      await getAllCourses(req, res);

      // Assert
      expect(res.json).toHaveBeenCalledWith(courses);
      expect(res.status).not.toHaveBeenCalledWith(500);
    });

    it('should return error when the database fails', async () => {
      // Arrange
      Course.findAll.mockRejectedValue(new Error('Database error'));
      const req = mockRequest();
      const res = mockResponse();

      // Act
      await getAllCourses(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
    });
  });

  // Test for getCourseById
  describe('getCourseById', () => {
    it('should return course by ID', async () => {
      // Arrange
      const course = {
        id: 1,
        course_name: 'Course 1',
        description: 'Description of Course 1',
        duration: '30 hours',
        level: 'Beginner',
        category: { id: 1, name: 'Category 1' }
      };
      Course.findOne.mockResolvedValue(course);
      const req = mockRequest({ id: '1' });
      const res = mockResponse();

      // Act
      await getCourseById(req, res);

      // Assert
      expect(res.json).toHaveBeenCalledWith(course);
      expect(res.status).not.toHaveBeenCalledWith(404);
    });

    it('should return 404 if course not found', async () => {
      // Arrange
      Course.findOne.mockResolvedValue(null);  // Simulate no course found
      const req = mockRequest({ id: '1' });
      const res = mockResponse();

      // Act
      await getCourseById(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Course not found' });
    });

    it('should handle errors', async () => {
      // Arrange
      Course.findOne.mockRejectedValue(new Error('Database error'));
      const req = mockRequest({ id: '1' });
      const res = mockResponse();

      // Act
      await getCourseById(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
    });
  });

  // Test for createCourse
  describe('createCourse', () => {
    it('should create a new course successfully', async () => {
      // Arrange
      const newCourse = {
        id: 1,
        course_name: 'New Course',
        description: 'Description of New Course',
        duration: '40 hours',
        level: 'Intermediate',
        category_id: 1
      };
      Course.create.mockResolvedValue(newCourse);
      const req = mockRequest({}, newCourse);
      const res = mockResponse();

      // Act
      await createCourse(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(newCourse);
    });

    it('should return error if creation fails', async () => {
      // Arrange
      Course.create.mockRejectedValue(new Error('Database error'));
      const req = mockRequest({}, { course_name: 'New Course' });
      const res = mockResponse();

      // Act
      await createCourse(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
    });
  });

  // Test for updateCourse
  describe('updateCourse', () => {
    it('should update a course successfully', async () => {
      // Arrange
      const updatedCourse = {
        id: 1,
        course_name: 'Updated Course',
        description: 'Updated Description',
        duration: '45 hours',
        level: 'Advanced',
        category_id: 2
      };
      const course = {
        ...updatedCourse,
        update: jest.fn().mockResolvedValue([1])  // Mocking the update method
      };
      Course.findByPk.mockResolvedValue(course);
      const req = mockRequest({ id: '1' }, updatedCourse);
      const res = mockResponse();

      // Act
      await updateCourse(req, res);

      // Assert
      expect(res.json).toHaveBeenCalledWith({ message: 'Course updated successfully', course });
    });

    it('should return 404 if course to update is not found', async () => {
      // Arrange
      Course.findByPk.mockResolvedValue(null);  // Simulate no course found
      const req = mockRequest({ id: '999' }, { course_name: 'Updated Course' });
      const res = mockResponse();

      // Act
      await updateCourse(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Course not found' });
    });

    it('should handle errors during update', async () => {
      // Arrange
      Course.findByPk.mockRejectedValue(new Error('Database error'));
      const req = mockRequest({ id: '1' }, { course_name: 'Updated Course' });
      const res = mockResponse();

      // Act
      await updateCourse(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
    });
  });

  // Test for deleteCourse
  describe('deleteCourse', () => {
    it('should delete course successfully', async () => {
      // Arrange
      const course = {
        id: 1,
        course_name: 'Course to Delete',
        description: 'Description of course to delete',
        destroy: jest.fn().mockResolvedValue()
      };
      Course.findByPk.mockResolvedValue(course);
      const req = mockRequest({ id: '1' });
      const res = mockResponse();

      // Act
      await deleteCourse(req, res);

      // Assert
      expect(res.json).toHaveBeenCalledWith({ message: 'Course deleted successfully' });
    });

    it('should return 404 if course to delete is not found', async () => {
      // Arrange
      Course.findByPk.mockResolvedValue(null);  // Simulate no course found
      const req = mockRequest({ id: '999' });
      const res = mockResponse();

      // Act
      await deleteCourse(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Course not found' });
    });

    it('should handle errors during deletion', async () => {
      // Arrange
      Course.findByPk.mockRejectedValue(new Error('Database error'));
      const req = mockRequest({ id: '1' });
      const res = mockResponse();

      // Act
      await deleteCourse(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
    });
  });
});
