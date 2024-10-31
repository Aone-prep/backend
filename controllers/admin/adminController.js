const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../../models');
exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body;
//    const pass = (await bcrypt.hash(password, 10));
    try {
        const user = await User.findOne({ where: { email } });
          if (!user || !(password===user.password)) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user.id, username: user.username }, 'secretkey', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};