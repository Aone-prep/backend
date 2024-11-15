const router = require('../../routes/user/userRoutes');
const userController = require('../../controllers/user/userController');

jest.mock('../../controllers/user/userController');

describe('POST /login', () => {
    let app, req, res;

    beforeEach(() => {
        app = express();
        app.use(express.json());
        app.use(router);

        req = {};
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
    });

    it('should call loginUser and return a token', async () => {
        const loginData = { username: 'john_doe', password: 'Password123' };

        userController.loginUser.mockResolvedValue({
            message: 'Login successful',
            token: 'fake-jwt-token',
        });

        req.body = loginData;

        await app.handle({
            method: 'POST',
            url: '/login',
            payload: req.body,
        }, res);

        expect(userController.loginUser).toHaveBeenCalledWith(req, res);
        expect(res.json).toHaveBeenCalledWith({ message: 'Login successful', token: 'fake-jwt-token' });
    });
});
