jest.mock('bcryptjs', () => ({
    compare: jest.fn(),
    hash: jest.fn(),
  }));
  jest.mock('../../models', () => ({
    User: {
      findByPk: jest.fn(),
      update: jest.fn(),
    },
  }));
  
  const { resetPassword } = require('../../controllers/user/userController');
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
  
  describe('POST /reset-password', () => {
    let req, res;
  
    beforeEach(() => {
      req = {}; // Reset the request object
      res = mockResponse(); // Initialize mock response
    });
  
    it('should reset the password successfully', async () => {
      // Arrange: Mock user data and password comparison
      const oldPassword = 'oldPassword123';
      const newPassword = 'newPassword123';
      const userData = { id: 1, password: 'hashedOldPassword123' }; // The user's existing password (hashed)
  
      // Mock User.findByPk to return a user
      User.findByPk.mockResolvedValue(userData);
      // Mock bcrypt.compare to return true (old password matches)
      bcrypt.compare.mockResolvedValue(true);
      // Mock bcrypt.hash to return a hashed password for the new password
      bcrypt.hash.mockResolvedValue('hashedNewPassword123');
      // Mock User.update to simulate password update
      User.update.mockResolvedValue([1]); // [1] indicates one row was updated
  
      // Mock request object
      req = mockRequest({ oldPassword, newPassword }, { id: 1 });
  
      // Act: Call the resetPassword controller
      await resetPassword(req, res);
  
      // Assert: Ensure the correct sequence of calls and responses
      expect(User.findByPk).toHaveBeenCalledWith(1); // Ensure we fetch the user with ID 1
      expect(bcrypt.compare).toHaveBeenCalledWith(oldPassword, 'hashedOldPassword123'); // Ensure old password is compared
      expect(bcrypt.hash).toHaveBeenCalledWith(newPassword, 10); // Ensure new password is hashed
      expect(User.update).toHaveBeenCalledWith(
        { password: 'hashedNewPassword123' },
        { where: { id: 1 } }
      ); // Ensure the password update is called
  
      // Assert that the response is successful
      expect(res.json).toHaveBeenCalledWith({ message: 'Password reset successfully' });
    });
  
    it('should return error if old password is incorrect', async () => {
      // Arrange: Mock user data and password comparison
      const oldPassword = 'wrongOldPassword';
      const newPassword = 'newPassword123';
      const userData = { id: 1, password: 'hashedOldPassword123' };
  
      // Mock User.findByPk to return a user
      User.findByPk.mockResolvedValue(userData);
      // Mock bcrypt.compare to return false (old password doesn't match)
      bcrypt.compare.mockResolvedValue(false);
  
      // Mock request object
      req = mockRequest({ oldPassword, newPassword }, { id: 1 });
  
      // Act: Call the resetPassword controller
      await resetPassword(req, res);
  
      // Assert: Ensure that the appropriate error message is returned
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Incorrect old password' });
    });
  
    it('should return error if user is not found', async () => {
      // Arrange: Mock user data and password comparison
      const oldPassword = 'oldPassword123';
      const newPassword = 'newPassword123';
  
      // Mock User.findByPk to return null (user not found)
      User.findByPk.mockResolvedValue(null);
  
      // Mock request object
      req = mockRequest({ oldPassword, newPassword }, { id: 1 });
  
      // Act: Call the resetPassword controller
      await resetPassword(req, res);
  
      // Assert: Ensure that the appropriate error message is returned
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
    });
  
    it('should return error if there is a database error', async () => {
      // Arrange: Mock user data and password comparison
      const oldPassword = 'oldPassword123';
      const newPassword = 'newPassword123';
      const userData = { id: 1, password: 'hashedOldPassword123' };
  
      // Mock User.findByPk to return a user
      User.findByPk.mockResolvedValue(userData);
      // Mock bcrypt.compare to return true (old password matches)
      bcrypt.compare.mockResolvedValue(true);
      // Mock bcrypt.hash to return a hashed password for the new password
      bcrypt.hash.mockResolvedValue('hashedNewPassword123');
      // Mock User.update to throw an error (simulate database error)
      User.update.mockRejectedValue(new Error('Database error'));
  
      // Mock request object
      req = mockRequest({ oldPassword, newPassword }, { id: 1 });
  
      // Act: Call the resetPassword controller
      await resetPassword(req, res);
  
      // Assert: Ensure the appropriate error message is returned
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Failed to reset password',
        error: 'Database error',
      });
    });
  });
  