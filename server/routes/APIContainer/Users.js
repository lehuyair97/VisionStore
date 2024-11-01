const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const { User } = require("./../../models/userModel");
const {
  createAccessToken,
  createRefreshToken,
  saveRefreshToken,
  verifyRefreshToken,
} = require("./token");
const RefreshToken = require("./../../models/refresh_token");

require("dotenv").config();
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
  try {
    // Kiểm tra xem email đã tồn tại hay chưa
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({
        isSuccess: false,
        message: "Email đã tồn tại",
      });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({ ...req.body, password: hashedPassword });
    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);
    await saveRefreshToken(refreshToken, user._id);
    
    res.status(200).json({
      isSuccess: true,
      user: user,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
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
      avatar: `${req.protocol}://${req.get("host")}/api/uploads/users${
        req.file.filename
      }`,
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
    const { email, password, device_token } = req.body;
    console.log(req.body)
    // Kiểm tra email và password có tồn tại không
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Tìm người dùng trong cơ sở dữ liệu
    const user = await User.findOne({ email });

    // Nếu không tìm thấy người dùng
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // So sánh password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Tạo accessToken và refreshToken
    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);
    await saveRefreshToken(refreshToken, user._id);

    // Cập nhật device_token vào thông tin người dùng
    if (device_token) {
      console.log(device_token)
      user.device_token = device_token; // Lưu device_token vào user
      await user.save(); // Lưu thay đổi vào cơ sở dữ liệu
    }

    // Gửi phản hồi cho người dùng
    res.status(200).json({
      isSuccess: true,
      user: user,
      accessToken: accessToken,
      refreshToken: refreshToken,
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

exports.signinWithGoogle = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: "Google token is required" });
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        userName: name,
        email: email,
        avatar: picture,
        password: "default",
      });
    }

    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);
    // await saveRefreshToken(user._id, refreshToken);

    res.status(200).json({
      isSuccess: true,
      user: user,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
