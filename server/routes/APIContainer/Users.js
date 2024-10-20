const {User} = require("./../../models/userModel");
const {
  createAccessToken,
  createRefreshToken,
  saveRefreshToken,
} = require("./token");
const RefreshToken = require('./../../models/refresh_token')

require("dotenv").config();
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
  try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = await User.create({ ...req.body, password: hashedPassword });
      res.status(200).json({ isSuccess: true, user: user });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

exports.createUserWithImage = async (req, res) => {
  try {
      const newUser = {
          userName: req.body.userName,
          email: req.body.email,
          password: req.body.password,
          avatar: `${req.protocol}://${req.get("host")}/api/images/${req.file.filename}`, 
      };

      const user = await User.create(newUser);
      res.status(201).json(user);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
      const users = await User.find({});
      res.status(200).json(users);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
      const { id } = req.params;
      const user = await User.findById(id);
      res.status(200).json(user);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
      const { id } = req.params;
      const { password, ...userData } = req.body;
      if (password) {
          const hashedPassword = await bcrypt.hash(password, 10);
          userData.password = hashedPassword;
      }
      const updatedUser = await User.findByIdAndUpdate(id, userData, {
          new: true,
      });
      if (!updatedUser) {
          return res.status(404).json({ message: `User not found with ID: ${id}` });
      }

      res.status(200).json(updatedUser);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

exports.updateFavorite = async (req, res) => {
  try {
      const { id } = req.params;
      const { favorites, ...userData } = req.body;

      if (favorites) {
          const updatedUser = await User.findByIdAndUpdate(
              id,
              { ...userData, favorites: favorites },
              { new: true }
          );
          if (!updatedUser) {
              return res
                  .status(404)
                  .json({ message: `User not found with ID: ${id}` });
          }
          res.status(200).json({ isSuccess: true, user: updatedUser });
      }
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

exports.updateInfo = async (req, res) => {
  try {
      const { id } = req.params;
      const newUser = req.body;

      if (newUser) {
          const updatedUser = await User.findByIdAndUpdate(id, newUser, {
              new: true,
              runValidators: true,
          });

          if (!updatedUser) {
              return res
                  .status(404)
                  .json({ message: `User not found with ID: ${id}` });
          }

          return res.status(200).json({ isSuccess: true, user: updatedUser });
      } else {
          return res.status(400).json({ message: "No user data provided" });
      }
  } catch (error) {
      return res.status(500).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
      const { id } = req.params;
      const user = await User.findByIdAndDelete(id);
      if (!user) {
          return res.status(404).json({ message: `User not found with ID: ${id}` });
      }
      res.status(200).json(user);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
      const { email, password } = req.body;

      if (!email || !password) {
          return res.status(400).json({ message: "Email and password are required" });
      }

      const user = await User.findOne({ email });

      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(401).json({ message: "Incorrect password" });
      }

      // Không cần tạo token nếu không sử dụng xác thực
      res.status(200).json({
          isSuccess: true,
          user: user,
      });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

exports.refreshToken = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: "Refresh Token is required" });
  }

  try {
    const storedToken = await RefreshToken.findOne({ token });

    if (!storedToken) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const user = verifyRefreshToken(token);

    const accessToken = createAccessToken(user);

    res.status(200).json({
      accessToken: accessToken,
      refreshToken: token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.logout = async (req, res) => {
  const { token } = req.body;

  try {
    await RefreshToken.findOneAndDelete({ token });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};