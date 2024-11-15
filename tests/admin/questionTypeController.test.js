// questionTypeController.test.js
const { getAllQuestionType, getQuestionTypeById, createQuestionType, updateQuestionType, deleteQuestionType } = require('../../controllers/admin/questionTypecontroller');
const { QuestionType } = require('../../models');

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

jest.mock('../../models');  // Mock the QuestionType model

describe('Question Type Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test for getAllQuestionType
  describe('getAllQuestionType', () => {
    it('should return all question types successfully', async () => {
      // Arrange
      const questionTypes = [{ id: 1, name: 'Multiple Choice', status: 'active' }];
      QuestionType.findAll.mockResolvedValue(questionTypes);  // Mock the model method
      const req = mockRequest();
      const res = mockResponse();

      // Act
      await getAllQuestionType(req, res);

      // Assert
      expect(res.json).toHaveBeenCalledWith(questionTypes);
      expect(res.status).not.toHaveBeenCalledWith(500);
    });

    it('should return error when the database fails', async () => {
      // Arrange
      QuestionType.findAll.mockRejectedValue(new Error('Database error'));
      const req = mockRequest();
      const res = mockResponse();

      // Act
      await getAllQuestionType(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
    });
  });

  // Test for getQuestionTypeById
  describe('getQuestionTypeById', () => {
    it('should return question type by ID', async () => {
      // Arrange
      const questionType = { id: 1, name: 'Multiple Choice', status: 'active' };
      QuestionType.findByPk.mockResolvedValue(questionType);
      const req = mockRequest({ id: '1' });
      const res = mockResponse();

      // Act
      await getQuestionTypeById(req, res);

      // Assert
      expect(res.json).toHaveBeenCalledWith(questionType);
      expect(res.status).not.toHaveBeenCalledWith(404);
    });

    it('should return 404 if question type not found', async () => {
      // Arrange
      QuestionType.findByPk.mockResolvedValue(null);  // Simulate no question type found
      const req = mockRequest({ id: '1' });
      const res = mockResponse();

      // Act
      await getQuestionTypeById(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Question Type not found' });
    });

    it('should handle errors', async () => {
      // Arrange
      QuestionType.findByPk.mockRejectedValue(new Error('Database error'));
      const req = mockRequest({ id: '1' });
      const res = mockResponse();

      // Act
      await getQuestionTypeById(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
    });
  });

  // Test for createQuestionType
  describe('createQuestionType', () => {
    it('should create a new question type successfully', async () => {
      // Arrange
      const newQuestionType = { id: 1, name: 'Short Answer', status: 'active' };
      QuestionType.create.mockResolvedValue(newQuestionType);
      const req = mockRequest({}, { name: 'Short Answer', status: 'active' });
      const res = mockResponse();

      // Act
      await createQuestionType(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(newQuestionType);
    });

    it('should return error if the creation fails', async () => {
      // Arrange
      QuestionType.create.mockRejectedValue(new Error('Database error'));
      const req = mockRequest({}, { name: 'Short Answer', status: 'active' });
      const res = mockResponse();

      // Act
      await createQuestionType(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
    });
  });

  // Test for deleteQuestionType
  describe('deleteQuestionType', () => {
    it('should delete question type successfully', async () => {
      // Arrange
      const questionType = { id: 1, name: 'Multiple Choice', status: 'active', destroy: jest.fn().mockResolvedValue() };
      QuestionType.findByPk.mockResolvedValue(questionType);
      const req = mockRequest({ id: '1' });
      const res = mockResponse();

      // Act
      await deleteQuestionType(req, res);

      // Assert
      expect(res.json).toHaveBeenCalledWith({ message: 'Question Type deleted successfully' });
    });

    it('should return 404 if question type to delete is not found', async () => {
      // Arrange
      QuestionType.findByPk.mockResolvedValue(null);  // Simulate no question type found
      const req = mockRequest({ id: '999' });
      const res = mockResponse();

      // Act
      await deleteQuestionType(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Question Type not found' });
    });

    it('should handle errors during deletion', async () => {
      // Arrange
      QuestionType.findByPk.mockRejectedValue(new Error('Database error'));
      const req = mockRequest({ id: '1' });
      const res = mockResponse();

      // Act
      await deleteQuestionType(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
    });
  });
});