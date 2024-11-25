const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  User,
  Course,
  UserCourse,
  UserTest,
  MockTest,
  Content,
} = require("../../models");

// Register User
exports.registerUser = async (req, res) => {
  const { first_name, last_name, username, email, password } = req.body;
  try {
    // Check if username or email already exists
    const existingUser =
      (await User.findOne({ where: { username } })) ||
      (await User.findOne({ where: { email } }));
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      first_name,
      last_name,
      username,
      email,
      password: hashedPassword,
      role: "user",
      status: "1",
    });
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Registration failed", error: error.message });
  }
};
// Login User
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1h" }
    );
    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        username: user.username,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

exports.getUserInfo = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] },
      include: [
        {
          model: UserCourse, // Include UserCourse directly
          as: "userCourses",
          attributes: ["comment", "progress", "rating", "status"],
          include: [
            {
              model: Course,
              as: "course",
              attributes: ["id", "course_name", "description"],
              include: [
                {
                  model: Content,
                  as: "contents",
                  attributes: ["id", "title", "type"],
                },
              ],
            },
          ],
        },
        {
          model: UserTest,
          as: "userTests",
          attributes: ["obtained_mark", "pass_mark", "full_mark", "passed"],
          include: [
            {
              model: MockTest,
              as: "mockTest",
              attributes: ["name", "description"],
            },
          ],
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Log the data to see the structure
    console.log("User data:", JSON.stringify(user, null, 2));

    res.json(user);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Failed to fetch user info",
      error: error.message,
    });
  }
};

// Get User Info (Protected)
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
    });
    console.log(user);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch user info", error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    // Fetch all users excluding the 'password' field
    const users = await User.findAll({ attributes: { exclude: ["password"] } });

    // If no users are found, return a 404 status
    if (!users.length)
      return res.status(404).json({ message: "No users found" });

    // Return the list of users
    res.json(users);
  } catch (error) {
    // If there's an error, return a 500 status with the error message
    res
      .status(500)
      .json({ message: "Failed to fetch users", error: error.message });
  }
};

// Update User Info (Protected)
exports.updateUserInfo = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : user.password;
    await user.update({ email, password: hashedPassword });
    res.json({ message: "User updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update user info", error: error.message });
  }
};

// Reset Password (Protected)
exports.resetPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  try {
    const user = await User.findByPk(req.user.id);
    if (!user || !(await bcrypt.compare(oldPassword, user.password))) {
      return res.status(400).json({ message: "Incorrect old password" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await user.update({ password: hashedPassword });
    res.json({ message: "Password reset successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to reset password", error: error.message });
  }
};


