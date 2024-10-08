const User = require("./../../models/userModel");
const UsersImages = require("./../../models/userModelIamges");
const path = require("path");
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({ ...req.body, password: hashedPassword });
    res.status(200).json({isSuccess: true, user: user});
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
      avatar: `${req.protocol}://${req.get("host")}/api/images/${
        req.file.filename
      }`, // Tên file ảnh sẽ được lưu trong cơ sở dữ liệu
    };

    const user = await User.create(newUser);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createUserWithImages = async (req, res) => {
  try {
    const { files } = req;
    const urlImages = files.map(
      (file) => `${req.protocol}://${req.get("host")}/api/images`
    );
    const newUser = {
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
      avatar: urlImages,
    };

    const user = await UsersImages.create(newUser);
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
      const updatedUser = await User.findByIdAndUpdate(id, userData, { new: true });
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
      const updatedUser = await User.findByIdAndUpdate(id, { ...userData, favorites: favorites }, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ message: `User not found with ID: ${id}` });
      }
      res.status(200).json({isSuccess: true, user: updatedUser});
    } 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatePaymentMethod = async (req, res) => {
  try {
    const { id } = req.params;
    const { paymentMethod, ...userData } = req.body;
    if (paymentMethod) {
      const updatedUser = await User.findByIdAndUpdate(id, { ...userData, paymentMethod: paymentMethod }, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ message: `User not found with ID: ${id}` });
      }
      res.status(200).json({isSuccess: true, user: updatedUser});
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
      const updatedUser = await User.findByIdAndUpdate(id, newUser, { new: true, runValidators: true });
      
      if (!updatedUser) {
        return res.status(404).json({ message: `User not found with ID: ${id}` });
      }
      
      return res.status(200).json({ isSuccess: true, user: updatedUser });
    } else {
      return res.status(400).json({ message: 'No user data provided' });
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

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET 
let refreshTokens = []; // Lưu trữ tạm thời các refresh token
const refreshTokenSchema = new mongoose.Schema({
  token: String,
  userId: mongoose.Schema.Types.ObjectId,
  expiresAt: Date,
});
const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema);

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kiểm tra xem email và password có được cung cấp hay không
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Tìm người dùng trong cơ sở dữ liệu bằng email
    const user = await User.findOne({ email });

    // Kiểm tra xem người dùng có tồn tại không
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Kiểm tra mật khẩu có đúng không
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Tạo access token
    const accessToken = jwt.sign({ userId: user._id, email: user.email }, accessTokenSecret, { expiresIn: '15m' });

    // Tạo refresh token
    const refreshToken = jwt.sign({ userId: user._id, email: user.email }, refreshTokenSecret, { expiresIn: '7d' });
    refreshTokens.push(refreshToken); // Lưu trữ tạm thời, bạn nên lưu vào DB trong thực tế

    // Trả về token cho client
    res.status(200).json({ 
      isSuccess: true, 
      accessToken: accessToken, 
      refreshToken: refreshToken,
      user: user 
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
    // Tìm refresh token trong cơ sở dữ liệu
    const storedToken = await RefreshToken.findOne({ token });

    if (!storedToken) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    // Xác minh refresh token
    jwt.verify(token, refreshTokenSecret, async (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Invalid refresh token" });
      }

      // Tạo mới access token
      const accessToken = jwt.sign({ userId: user.userId, email: user.email }, accessTokenSecret, { expiresIn: '15m' });

      // Tạo mới refresh token
      const newRefreshToken = jwt.sign({ userId: user.userId, email: user.email }, refreshTokenSecret, { expiresIn: '7d' });
      // Lưu refresh token mới vào cơ sở dữ liệu
      await RefreshToken.create({ token: newRefreshToken, userId: user.userId, expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });

      res.status(200).json({ 
        accessToken: accessToken,
        refreshToken: newRefreshToken // Trả về refresh token mới
      });
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.logout = async (req, res) => {
  const { token } = req.body;

  try {
    // Xóa refresh token khỏi cơ sở dữ liệu
    await RefreshToken.findOneAndDelete({ token });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
