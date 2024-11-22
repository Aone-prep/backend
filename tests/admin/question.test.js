const { getAllQuestions, getQuestionById, createQuestion, updateQuestion, deleteQuestion } = require('../../controllers/admin/questionsController');
const { Question, MockTest, QuestionType } = require('../../models');

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

jest.mock('../../models');  // Mock the Question, MockTest, and QuestionType models

describe('Question Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test for getAllQuestions
  describe('getAllQuestions', () => {
    it('should return all questions successfully', async () => {
      // Arrange
      const questions = [
        {
          id: 1,
          description: 'What is 2 + 2?',
          optionA: '3',
          optionB: '4',
          optionC: '5',
          optionD: '6',
          answer: '4',
          mockTest: { id: 1, name: 'Mock Test 1' },
          questionType: { id: 1, name: 'Multiple Choice' },
        }
      ];
      Question.findAll.mockResolvedValue(questions);  // Mock the model method
      const req = mockRequest();
      const res = mockResponse();

      // Act
      await getAllQuestions(req, res);

      // Assert
      expect(res.json).toHaveBeenCalledWith(questions);
      expect(res.status).not.toHaveBeenCalledWith(500);
    });

    it('should return error when the database fails', async () => {
      // Arrange
      Question.findAll.mockRejectedValue(new Error('Database error'));
      const req = mockRequest();
      const res = mockResponse();

      // Act
      await getAllQuestions(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
    });
  });

  // Test for getQuestionById
  describe('getQuestionById', () => {
    it('should return question by ID', async () => {
      // Arrange
      const question = {
        id: 1,
        description: 'What is 2 + 2?',
        optionA: '3',
        optionB: '4',
        optionC: '5',
        optionD: '6',
        answer: '4',
        mockTest: { id: 1, name: 'Mock Test 1' },
        questionType: { id: 1, name: 'Multiple Choice' }
      };
      Question.findOne.mockResolvedValue(question);
      const req = mockRequest({ id: '1' });
      const res = mockResponse();

      // Act
      await getQuestionById(req, res);

      // Assert
      expect(res.json).toHaveBeenCalledWith(question);
      expect(res.status).not.toHaveBeenCalledWith(404);
    });

    it('should return 404 if question not found', async () => {
      // Arrange
      Question.findOne.mockResolvedValue(null);  // Simulate no question found
      const req = mockRequest({ id: '1' });
      const res = mockResponse();

      // Act
      await getQuestionById(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Question not found' });
    });

    it('should handle errors', async () => {
      // Arrange
      Question.findOne.mockRejectedValue(new Error('Database error'));
      const req = mockRequest({ id: '1' });
      const res = mockResponse();

      // Act
      await getQuestionById(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
    });
  });

  // Test for createQuestion
  describe('createQuestion', () => {
    it('should create a new question successfully', async () => {
      // Arrange
      const newQuestion = {
        description: 'What is 2 + 2?',
        optionA: '3',
        optionB: '4',
        optionC: '5',
        optionD: '6',
        answer: '4',
        mock_test_id: 1,
        question_type_id: 1,
        status: 'active',
        created_by: 'Admin'
      };
      Question.create.mockResolvedValue(newQuestion);
      const req = mockRequest({}, newQuestion);
      const res = mockResponse();

      // Act
      await createQuestion(req, res);

      // Assert
      expect(res.json).toHaveBeenCalledWith(question);
      expect(res.status).not.toHaveBeenCalledWith(400);
    });

    it('should return error if creation fails', async () => {
      // Arrange
      Question.create.mockRejectedValue(new Error('Database error'));
      const req = mockRequest({}, { description: 'What is 2 + 2?' });
      const res = mockResponse();

      // Act
      await createQuestion(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
    });
  });

  // Test for updateQuestion
  describe('updateQuestion', () => {
    it('should update a question successfully', async () => {
      // Arrange
      const updatedQuestion = {
        id: 1,
        description: 'What is 2 + 2?',
        optionA: '3',
        optionB: '4',
        optionC: '5',
        optionD: '6',
        answer: 'B',
        status: 'active'
      };
      const question = {
        ...updatedQuestion,
        update: jest.fn().mockResolvedValue([1])  // Mocking the update method
      };
      Question.findByPk.mockResolvedValue(question);
      const req = mockRequest({ id: '1' }, updatedQuestion);
      const res = mockResponse();

      // Act
      await updateQuestion(req, res);

      // Assert
      expect(res.json).toHaveBeenCalledWith({ message: 'Question updated successfully' });
    });

    it('should return 404 if question to update is not found', async () => {
      // Arrange
      Question.findByPk.mockResolvedValue(null);  // Simulate no question found
      const req = mockRequest({ id: '999' }, { description: 'Updated Question' });
      const res = mockResponse();

      // Act
      await updateQuestion(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Question not found' });
    });

    it('should handle errors during update', async () => {
      // Arrange
      Question.findByPk.mockRejectedValue(new Error('Database error'));
      const req = mockRequest({ id: '1' }, { description: 'Updated Question' });
      const res = mockResponse();

      // Act
      await updateQuestion(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
    });
  });

  // Test for deleteQuestion
  describe('deleteQuestion', () => {
    it('should delete question successfully', async () => {
      // Arrange
      const question = {
        id: 1,
        description: 'What is 2 + 2?',
        optionA: '3',
        optionB: '4',
        optionC: '5',
        optionD: '6',
        answer: '4',
        destroy: jest.fn().mockResolvedValue()
      };
      Question.findByPk.mockResolvedValue(question);
      const req = mockRequest({ id: '1' });
      const res = mockResponse();

      // Act
      await deleteQuestion(req, res);

      // Assert
      expect(res.json).toHaveBeenCalledWith({ message: 'Question deleted successfully' });
    });

    it('should return 404 if question to delete is not found', async () => {
      // Arrange
      Question.findByPk.mockResolvedValue(null);  // Simulate no question found
      const req = mockRequest({ id: '999' });
      const res = mockResponse();

      // Act
      await deleteQuestion(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Question not found' });
    });

    it('should handle errors during deletion', async () => {
      // Arrange
      Question.findByPk.mockRejectedValue(new Error('Database error'));
      const req = mockRequest({ id: '1' });
      const res = mockResponse();

      // Act
      await deleteQuestion(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
    });
  });
});
