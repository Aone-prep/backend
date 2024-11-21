// Mock the necessary modules
jest.mock('bcryptjs', () => ({
    compare: jest.fn(),
  }));
  jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(),
  }));
  jest.mock('../../models', () => ({
    User: {
      findOne: jest.fn(),
    },
  }));
  
  const { loginUser } = require('../../controllers/user/userController');
  const { User } = require('../../models'); // Import the User model to mock
  const bcrypt = require('bcryptjs');
  const jwt = require('jsonwebtoken');
  
  // Helper functions to mock request and response objects
  const mockRequest = (body = {}) => ({
    body,
  });
  const mockResponse = () => {
    const res = {};
    res.json = jest.fn().mockReturnThis();
    res.status = jest.fn().mockReturnThis(); // Mock status to return the res object itself
    return res;
  };
  
  describe('POST /login', () => {
    let req, res;
  
    beforeEach(() => {
      req = {}; // Reset the request object
      res = mockResponse(); // Initialize mock response
    });
  
    it('should return success message and token on successful login', async () => {
      // Arrange: Mock user data
      const username = 'testuser';
      const password = 'password123';
      const user = { id: 1, username, password: 'hashedPassword123' };
  
      // Mock bcrypt.compare to return true (correct password)
      bcrypt.compare.mockResolvedValue(true);
      // Mock User.findOne to return the mocked user
      User.findOne.mockResolvedValue(user);
      // Mock jwt.sign to return a token
      jwt.sign.mockReturnValue('fake-jwt-token');
  
      const loginData = { username, password };
      req = mockRequest(loginData);
  
      // Act: Directly invoke the controller with the mocked request and response
      await loginUser(req, res);
  
      // Assert: Ensure correct response is returned
      expect(User.findOne).toHaveBeenCalledWith({ where: { username } });
      expect(bcrypt.compare).toHaveBeenCalledWith(password, 'hashedPassword123');
      expect(jwt.sign).toHaveBeenCalledWith(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET || 'secretkey',
        { expiresIn: '1h' }
      );
      expect(res.json).toHaveBeenCalledWith({
        message: 'Login successful',
        token: 'fake-jwt-token',
      });
    });
  
    it('should return error message if username or password is incorrect', async () => {
      // Arrange: Mock user data
      const username = 'testuser';
      const password = 'wrongpassword';
      const user = { id: 1, username, password: 'hashedPassword123' };
  
      // Mock bcrypt.compare to return false (incorrect password)
      bcrypt.compare.mockResolvedValue(false);
      // Mock User.findOne to return the mocked user
      User.findOne.mockResolvedValue(user);
  
      const loginData = { username, password };
      req = mockRequest(loginData);
  
      // Act: Directly invoke the controller with the mocked request and response
      await loginUser(req, res);
  
      // Assert: Ensure the correct error response is returned
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid username or password' });
    });
  
    it('should return error message if user is not found', async () => {
      // Arrange: Mock username and password
      const username = 'nonexistentuser';
      const password = 'password123';
  
      // Mock User.findOne to return null (no user found)
      User.findOne.mockResolvedValue(null);
  
      const loginData = { username, password };
      req = mockRequest(loginData);
  
      // Act: Directly invoke the controller with the mocked request and response
      await loginUser(req, res);
  
      // Assert: Ensure the correct error response is returned
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid username or password' });
    });
  
    it('should return error message if login fails due to server error', async () => {
      // Arrange: Mock username and password
      const username = 'testuser';
      const password = 'password123';
  
      // Mock User.findOne to throw an error (simulate a server issue)
      User.findOne.mockRejectedValue(new Error('Database error'));
  
      const loginData = { username, password };
      req = mockRequest(loginData);
  
      // Act: Directly invoke the controller with the mocked request and response
      await loginUser(req, res);
  
      // Assert: Ensure the error is handled properly
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Login failed',
        error: 'Database error',
      });
    });
  });
  