const router = require('../../routes/user/userRoutes');
const userController = require('../../controllers/user/userController');

jest.mock('../../controllers/user/userController');

describe('POST /register', () => {
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

    it('should call registerUser and return a success message', async () => {
        const userData = {
            first_name: 'John',
            last_name: 'Doe',
            username: 'john_doe',
            email: 'john.doe@example.com',
            password: 'Password123',
        };

        userController.registerUser.mockResolvedValue({
            message: 'User registered successfully',
        });

        req.body = userData;

        await app.handle({
            method: 'POST',
            url: '/register',
            payload: req.body,
        }, res);

        expect(userController.registerUser).toHaveBeenCalledWith(req, res);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ message: 'User registered successfully' });
    });
});
