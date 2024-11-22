const { getAllMockTests, getMockTestById, createMockTest, updateMockTest, deleteMockTest } = require('../../controllers/admin/mocktestController');
const { MockTest, Course } = require('../../models');

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

jest.mock('../../models');  // Mock the MockTest and Course models

describe('Mock Test Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test for getAllMockTests
  describe('getAllMockTests', () => {
    it('should return all mock tests successfully', async () => {
      // Arrange
      const mockTests = [
        {
          id: 1,
          name: 'Mock Test 1',
          description: 'Description of Mock Test 1',
          duration: '60 minutes',
          max_score: 100,
          course: { id: 1, course_name: 'Course 1' }
        }
      ];
      MockTest.findAll.mockResolvedValue(mockTests);  // Mock the model method
      const req = mockRequest();
      const res = mockResponse();

      // Act
      await getAllMockTests(req, res);

      // Assert
      expect(res.json).toHaveBeenCalledWith(mockTests);
      expect(res.status).not.toHaveBeenCalledWith(500);
    });

    it('should return error when the database fails', async () => {
      // Arrange
      MockTest.findAll.mockRejectedValue(new Error('Database error'));
      const req = mockRequest();
      const res = mockResponse();

      // Act
      await getAllMockTests(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
    });
  });

  // Test for getMockTestById
  describe('getMockTestById', () => {
    it('should return mock test by ID', async () => {
      // Arrange
      const mockTest = {
        id: 1,
        name: 'Mock Test 1',
        description: 'Description of Mock Test 1',
        duration: '60 minutes',
        max_score: 100,
        course: { id: 1, course_name: 'Course 1' }
      };
      MockTest.findByPk.mockResolvedValue(mockTest);
      const req = mockRequest({ id: '1' });
      const res = mockResponse();

      // Act
      await getMockTestById(req, res);

      // Assert
      expect(res.json).toHaveBeenCalledWith(mockTest);
      expect(res.status).not.toHaveBeenCalledWith(404);
    });

    it('should return 404 if mock test not found', async () => {
      // Arrange
      MockTest.findByPk.mockResolvedValue(null);  // Simulate no mock test found
      const req = mockRequest({ id: '1' });
      const res = mockResponse();

      // Act
      await getMockTestById(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Mock Test not found' });
    });

    it('should handle errors', async () => {
      // Arrange
      MockTest.findByPk.mockRejectedValue(new Error('Database error'));
      const req = mockRequest({ id: '1' });
      const res = mockResponse();

      // Act
      await getMockTestById(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
    });
  });

  // Test for createMockTest
  describe('createMockTest', () => {
    it('should create a new mock test successfully', async () => {
      // Arrange
      const newMockTest = {
        id: 1,
        name: 'Mock Test 1',
        description: 'Description of Mock Test 1',
        duration: '60 minutes',
        max_score: 100,
        course_id: 1,
        level: 1,
        status: 'active'
      };
      MockTest.create.mockResolvedValue(newMockTest);
      const req = mockRequest({}, newMockTest);
      const res = mockResponse();

      // Act
      await createMockTest(req, res);

      // Assert
      expect(res.json).toHaveBeenCalledWith({ message: 'Mock Test Added Successfully' });
    });

    it('should return error if creation fails', async () => {
      // Arrange
      MockTest.create.mockRejectedValue(new Error('Database error'));
      const req = mockRequest({}, { name: 'Mock Test' });
      const res = mockResponse();

      // Act
      await createMockTest(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
    });
  });

  // Test for updateMockTest
  describe('updateMockTest', () => {
    it('should update a mock test successfully', async () => {
      // Arrange
      const updatedMockTest = {
        id: 1,
        name: 'Updated Mock Test',
        description: 'Updated Description',
        duration: '90 minutes',
        max_score: 120,
        status: 'active'
      };
      const mockTest = {
        ...updatedMockTest,
        update: jest.fn().mockResolvedValue([1])  // Mocking the update method
      };
      MockTest.findByPk.mockResolvedValue(mockTest);
      const req = mockRequest({ id: '1' }, updatedMockTest);
      const res = mockResponse();

      // Act
      await updateMockTest(req, res);

      // Assert
      expect(res.json).toHaveBeenCalledWith({ message: 'Mock Test updated successfully' });
    });

    it('should return 404 if mock test to update is not found', async () => {
      // Arrange
      MockTest.findByPk.mockResolvedValue(null);  // Simulate no mock test found
      const req = mockRequest({ id: '999' }, { name: 'Updated Mock Test' });
      const res = mockResponse();

      // Act
      await updateMockTest(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Mock Test not found' });
    });

    it('should handle errors during update', async () => {
      // Arrange
      MockTest.findByPk.mockRejectedValue(new Error('Database error'));
      const req = mockRequest({ id: '1' }, { name: 'Updated Mock Test' });
      const res = mockResponse();

      // Act
      await updateMockTest(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
    });
  });

  // Test for deleteMockTest
  describe('deleteMockTest', () => {
    it('should delete mock test successfully', async () => {
      // Arrange
      const mockTest = {
        id: 1,
        name: 'Mock Test to Delete',
        description: 'Description of mock test to delete',
        destroy: jest.fn().mockResolvedValue()
      };
      MockTest.findByPk.mockResolvedValue(mockTest);
      const req = mockRequest({ id: '1' });
      const res = mockResponse();

      // Act
      await deleteMockTest(req, res);

      // Assert
      expect(res.json).toHaveBeenCalledWith({ message: 'Mock test deleted successfully' });
    });

    it('should return 404 if mock test to delete is not found', async () => {
      // Arrange
      MockTest.findByPk.mockResolvedValue(null);  // Simulate no mock test found
      const req = mockRequest({ id: '999' });
      const res = mockResponse();

      // Act
      await deleteMockTest(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Mock test not found' });
    });

    it('should handle errors during deletion', async () => {
      // Arrange
      MockTest.findByPk.mockRejectedValue(new Error('Database error'));
      const req = mockRequest({ id: '1' });
      const res = mockResponse();

      // Act
      await deleteMockTest(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
    });
  });
});
