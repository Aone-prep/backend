jest.mock('bcryptjs', () => ({
    hash: jest.fn(),
  }));
  jest.mock('../../models', () => ({
    User: {
      findByPk: jest.fn(),
      update: jest.fn(),
    },
  }));
  
  const { updateUserInfo } = require('../../controllers/user/userController');
  const { User } = require('../../models');
  const bcrypt = require('bcryptjs');
  
  // Helper functions to mock request and response objects
  const mockRequest = (body = {}, user = {}) => ({
    body,
    user, // Simulate the authenticated user
  });
  const mockResponse = () => {
    const res = {};
    res.json = jest.fn().mockReturnThis();
    res.status = jest.fn().mockReturnThis(); // Mock status to return the res object itself
    return res;
  };
  
  describe('POST /update-user-info', () => {
    let req, res;
  
    beforeEach(() => {
      req = {}; // Reset the request object
      res = mockResponse(); // Initialize mock response
    });
  
    it('should successfully update user info (email and password)', async () => {
      // Arrange: Mock user data and bcrypt hash
      const email = 'newemail@example.com';
      const password = 'newPassword123';
      const userData = { id: 1, email: 'oldemail@example.com', password: 'oldHashedPassword123' };
  
      // Mock User.findByPk to return a valid user
      User.findByPk.mockResolvedValue(userData);
      // Mock bcrypt.hash to return the new hashed password
      bcrypt.hash.mockResolvedValue('newHashedPassword123');
      // Mock User.update to simulate user data update
      User.update.mockResolvedValue([1]); // [1] indicates one row was updated
  
      // Mock request object
      req = mockRequest({ email, password }, { id: 1 });
  
      // Act: Call the updateUserInfo controller
      await updateUserInfo(req, res);
  
      // Assert: Ensure that the appropriate update operations were called
      expect(User.findByPk).toHaveBeenCalledWith(1); // Ensure we fetch the user with ID 1
      expect(bcrypt.hash).toHaveBeenCalledWith(password, 10); // Ensure password hashing occurs
      expect(User.update).toHaveBeenCalledWith(
        { email, password: 'newHashedPassword123' },
        { where: { id: 1 } }
      ); // Ensure the user update operation was called
  
      // Assert that the response is successful
      expect(res.json).toHaveBeenCalledWith({ message: 'User updated successfully' });
    });
  
    it('should return error if user is not found', async () => {
      // Arrange: Mock the scenario where no user is found
      const email = 'newemail@example.com';
      const password = 'newPassword123';
  
      // Mock User.findByPk to return null (user not found)
      User.findByPk.mockResolvedValue(null);
  
      // Mock request object
      req = mockRequest({ email, password }, { id: 1 });
  
      // Act: Call the updateUserInfo controller
      await updateUserInfo(req, res);
  
      // Assert: Ensure that the appropriate error message is returned
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
    });
  
    it('should return error if there is a database error during update', async () => {
      // Arrange: Mock user data and bcrypt hash
      const email = 'newemail@example.com';
      const password = 'newPassword123';
      const userData = { id: 1, email: 'oldemail@example.com', password: 'oldHashedPassword123' };
  
      // Mock User.findByPk to return a valid user
      User.findByPk.mockResolvedValue(userData);
      // Mock bcrypt.hash to return the new hashed password
      bcrypt.hash.mockResolvedValue('newHashedPassword123');
      // Mock User.update to throw an error (simulate database error)
      User.update.mockRejectedValue(new Error('Database error'));
  
      // Mock request object
      req = mockRequest({ email, password }, { id: 1 });
  
      // Act: Call the updateUserInfo controller
      await updateUserInfo(req, res);
  
      // Assert: Ensure the error message is returned in case of a database error
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Failed to update user info',
        error: 'Database error',
      });
    });
  
    it('should update user info with no new password (email only)', async () => {
      // Arrange: Mock user data with no new password
      const email = 'newemail@example.com';
      const password = null; // No password change
      const userData = { id: 1, email: 'oldemail@example.com', password: 'oldHashedPassword123' };
  
      // Mock User.findByPk to return a valid user
      User.findByPk.mockResolvedValue(userData);
      // Mock bcrypt.hash to return the old hashed password (no change)
      bcrypt.hash.mockResolvedValue('oldHashedPassword123');
      // Mock User.update to simulate user data update
      User.update.mockResolvedValue([1]); // [1] indicates one row was updated
  
      // Mock request object
      req = mockRequest({ email, password }, { id: 1 });
  
      // Act: Call the updateUserInfo controller
      await updateUserInfo(req, res);
  
      // Assert: Ensure that the update was called with no password change
      expect(User.update).toHaveBeenCalledWith(
        { email, password: 'oldHashedPassword123' },
        { where: { id: 1 } }
      );
  
      // Assert that the response is successful
      expect(res.json).toHaveBeenCalledWith({ message: 'User updated successfully' });
    });
  });
  