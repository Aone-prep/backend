// Mock the necessary modules
jest.mock('bcryptjs', () => ({
    hash: jest.fn(),
  }));
  jest.mock('../../models', () => ({
    User: {
      findOne: jest.fn(),
      create: jest.fn(),
    },
  }));
  jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(),
  }));
  
  const { registerUser } = require('../../controllers/user/userController');
  const { User } = require('../../models');
  const bcrypt = require('bcryptjs');
  
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
  
  describe('POST /register', () => {
    let req, res;
  
    beforeEach(() => {
      req = {}; // Reset the request object
      res = mockResponse(); // Initialize mock response
    });
  
    it('should register the user successfully', async () => {
      // Arrange: Mock user data
      const userData = {
        first_name: 'John',
        last_name: 'Doe',
        username: 'johndoe',
        email: 'johndoe@example.com',
        password: 'password123',
      };
  
      // Mock User.findOne to return null (username and email are available)
      User.findOne.mockResolvedValue(null);
      // Mock bcrypt.hash to return a hashed password
      bcrypt.hash.mockResolvedValue('hashedPassword123');
      // Mock User.create to return the created user object
      User.create.mockResolvedValue({
        id: 1,
        ...userData,
        password: 'hashedPassword123',
        role: 'user',
        status: '1',
      });
  
      req = mockRequest(userData);
  
      // Act: Directly invoke the controller with the mocked request and response
      await registerUser(req, res);
  
      // Assert: Ensure that User.findOne is called with correct parameters to check for existing user
      expect(User.findOne).toHaveBeenCalledWith({ where: { username: userData.username } });
      expect(User.findOne).toHaveBeenCalledWith({ where: { email: userData.email } });
      expect(bcrypt.hash).toHaveBeenCalledWith(userData.password, 10);
      expect(User.create).toHaveBeenCalledWith({
        first_name: userData.first_name,
        last_name: userData.last_name,
        username: userData.username,
        email: userData.email,
        password: 'hashedPassword123',
        role: 'user',
        status: '1',
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: 'User registered successfully',
        user: {
          id: 1,
          ...userData,
          password: 'hashedPassword123',
          role: 'user',
          status: '1',
        },
      });
    });
  
    it('should return error if username or email already exists', async () => {
      // Arrange: Mock user data
      const userData = {
        first_name: 'John',
        last_name: 'Doe',
        username: 'johndoe',
        email: 'johndoe@example.com',
        password: 'password123',
      };
  
      // Mock User.findOne to return a user (indicating username or email already taken)
      User.findOne.mockResolvedValue({ id: 1, username: 'johndoe' });
  
      req = mockRequest(userData);
  
      // Act: Directly invoke the controller with the mocked request and response
      await registerUser(req, res);
  
      // Assert: Ensure that the error response is returned
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Username or email already in use',
      });
    });
  
    it('should return error if registration fails due to database error', async () => {
      // Arrange: Mock user data
      const userData = {
        first_name: 'John',
        last_name: 'Doe',
        username: 'johndoe',
        email: 'johndoe@example.com',
        password: 'password123',
      };
  
      // Mock User.findOne to return null (username and email are available)
      User.findOne.mockResolvedValue(null);
      // Mock bcrypt.hash to return a hashed password
      bcrypt.hash.mockResolvedValue('hashedPassword123');
      // Mock User.create to throw an error (simulate database error)
      User.create.mockRejectedValue(new Error('Database error'));
  
      req = mockRequest(userData);
  
      // Act: Directly invoke the controller with the mocked request and response
      await registerUser(req, res);
  
      // Assert: Ensure the error is handled properly
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Registration failed',
        error: 'Database error',
      });
    });
  });
  