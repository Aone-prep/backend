const { submitMockTestResult } = require('../../controllers/user/submitMockTestResult');
const { Question, MockTest, Result } = require('../../models');

// Mock models
jest.mock('../../models', () => ({
  Question: {
    findAll: jest.fn(),
  },
  MockTest: {},
  Result: {
    create: jest.fn(),
  },
}));

// Helper functions to create mock requests and responses
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnThis(); // Mock `status` to return the `res` object itself
  res.json = jest.fn().mockReturnThis();   // Mock `json` to return the `res` object itself
  return res;
};

const mockRequest = (body = {}) => ({
  body,
});

describe('submitMockTestResult Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should submit the mock test result successfully', async () => {
    // Arrange
    const answers = [
      { questionId: 1, selectedOption: 'A' },
      { questionId: 2, selectedOption: 'B' },
    ];

    const questions = [
      { id: 1, answer: 'A', mockTestId: 1 },
      { id: 2, answer: 'B', mockTestId: 1 },
    ];

    Question.findAll.mockResolvedValue(questions);
    Result.create.mockResolvedValue({ id: 1 });  // Simulate result creation
    const req = mockRequest({ userId: 1, mockTestId: 1, answers });
    const res = mockResponse();

    // Act
    await submitMockTestResult(req, res);

    // Assert
    expect(Result.create).toHaveBeenCalledWith({
      description: 'Mock test result for user 1',
      obtained_mark: 2,
      pass_mark: 2,
      full_mark: 2,
      highest_mark: 2,
    });
    expect(res.json).toHaveBeenCalledWith({
      message: 'Mock Test submitted successfully',
      totalScore: 2,
      passMark: 2,
      fullMark: 2,
      resultId: 1,
      passed: true,
    });
  });

  it('should return 404 if no questions are found for the mock test', async () => {
    // Arrange
    Question.findAll.mockResolvedValue([]); // No questions found
    const req = mockRequest({ userId: 1, mockTestId: 1, answers: [] });
    const res = mockResponse();

    // Act
    await submitMockTestResult(req, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'No questions found for this mock test' });
  });

  it('should return error when database fails during result creation', async () => {
    // Arrange
    const answers = [
      { questionId: 1, selectedOption: 'A' },
      { questionId: 2, selectedOption: 'B' },
    ];

    const questions = [
      { id: 1, answer: 'A', mockTestId: 1 },
      { id: 2, answer: 'B', mockTestId: 1 },
    ];

    Question.findAll.mockResolvedValue(questions);
    Result.create.mockRejectedValue(new Error('Database error'));  // Simulate error in result creation
    const req = mockRequest({ userId: 1, mockTestId: 1, answers });
    const res = mockResponse();

    // Act
    await submitMockTestResult(req, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Error submitting the test result' });
  });

  it('should correctly calculate passing mark and result', async () => {
    // Arrange
    const answers = [
      { questionId: 1, selectedOption: 'A' }, // Correct
      { questionId: 2, selectedOption: 'C' }, // Incorrect
    ];

    const questions = [
      { id: 1, answer: 'A', mockTestId: 1 },
      { id: 2, answer: 'B', mockTestId: 1 },
    ];

    Question.findAll.mockResolvedValue(questions);
    Result.create.mockResolvedValue({ id: 1 });  // Simulate result creation
    const req = mockRequest({ userId: 1, mockTestId: 1, answers });
    const res = mockResponse();

    // Act
    await submitMockTestResult(req, res);

    // Assert
    expect(res.json).toHaveBeenCalledWith({
      message: 'Mock Test submitted successfully',
      totalScore: 1,  // Only one correct answer
      passMark: 2,    // 60% of 2 questions (rounded up)
      fullMark: 2,
      resultId: 1,
      passed: false,  // Failed as totalScore < passMark
    });
  });

  it('should handle unexpected errors gracefully', async () => {
    // Arrange
    const req = mockRequest({ userId: 1, mockTestId: 1, answers: [] });
    const res = mockResponse();
    
    // Simulate an unexpected error
    Question.findAll.mockRejectedValue(new Error('Unexpected error'));

    // Act
    await submitMockTestResult(req, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Error submitting the test result' });
  });
});
