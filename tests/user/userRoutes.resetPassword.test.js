const express = require('express');
const router = require('../../routes/user/userRoutes');
const userController = require('../../controllers/user/userController');
const authMiddleware = require('../../middlewares/authMiddleware');

jest.mock('../../controllers/user/userController');
jest.mock('../../middlewares/authMiddleware');

describe('POST /reset-password', () => {
    let app, req, res, next;

    beforeEach(() => {
        app = express();
        app.use(express.json());
        app.use(router);

        req = {};
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
        next = jest.fn();
    });

    it('should call resetPassword and return success message', async () => {
        const resetPasswordData = { oldPassword: 'OldPassword123', newPassword: 'NewPassword123' };

        authMiddleware.mockImplementation((req, res, next) => next());
        userController.resetPassword.mockResolvedValue({
            message: 'Password reset successfully',
        });

        req.user = { id: 1 };
        req.body = resetPasswordData;

        await app.handle({
            method: 'POST',
            url: '/reset-password',
            payload: req.body,
            headers: { Authorization: 'Bearer fake-jwt-token' },
        }, res);

        expect(authMiddleware).toHaveBeenCalled();
        expect(userController.resetPassword).toHaveBeenCalledWith(req, res);
        expect(res.json).toHaveBeenCalledWith({ message: 'Password reset successfully' });
    });
});
