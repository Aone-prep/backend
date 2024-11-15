const express = require('express');
const router = require('../../routes/user/userRoutes');
const userController = require('../../controllers/user/userController');
const authMiddleware = require('../../middlewares/authMiddleware');

jest.mock('../../controllers/user/userController');
jest.mock('../../middlewares/authMiddleware');

describe('PUT /update-info', () => {
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

    it('should call updateUserInfo and return success message', async () => {
        const updateData = { email: 'new.email@example.com', password: 'NewPassword123' };

        authMiddleware.mockImplementation((req, res, next) => next());
        userController.updateUserInfo.mockResolvedValue({
            message: 'User updated successfully',
        });

        req.user = { id: 1 };
        req.body = updateData;

        await app.handle({
            method: 'PUT',
            url: '/update-info',
            payload: req.body,
            headers: { Authorization: 'Bearer fake-jwt-token' },
        }, res);

        expect(authMiddleware).toHaveBeenCalled();
        expect(userController.updateUserInfo).toHaveBeenCalledWith(req, res);
        expect(res.json).toHaveBeenCalledWith({ message: 'User updated successfully' });
    });
});
