const { OAuth2Client } = require("google-auth-library");
const _ = require("lodash");
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
    const { oldPassword, newPassword } = req.body;
    if (!id || !oldPassword || !newPassword) {
      return res.status(400).json({
        message: "User ID, old password, and new password are required.",
        isSuccess: false,
      });
    }
    if (typeof newPassword !== "string" || newPassword.trim().length < 6) {
      return res.status(400).json({
        message: "Mật khẩu mới phải trên 6 ký tự.",
        isSuccess: false,
      });
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        message: `User not found with ID: ${id}`,
        isSuccess: false,
      });
    }
    const isOldPasswordCorrect = await bcrypt.compare(
      oldPassword,
      user.password
    );
    if (!isOldPasswordCorrect) {
      return res.status(400).json({
        isSuccess: false,
        message: "Mật khẩu hiện tại chưa chính xác",
      });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedNewPassword;
    await user.save();

    return res.status(200).json({
      isSuccess: true,
      message: "Password updated successfully.",
    });
  } catch (error) {
    console.error("Error changing password:", error.message);
    return res.status(500).json({
      message: "An error occurred while changing the password.",
      error: error.message,
    });
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

exports.updateAndReplaceInfo = async (req, res) => {
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

exports.updateInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const allowedFields = [
      "display_name",
      "phoneNumber",
      "avatar",
      "address",
      "addressSelected",
      "favorites",
      "device_token",
    ];
    const updates = _.pick(req.body, allowedFields);

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No valid fields to update" });
    }
    const currentUser = await User.findById(id);
    if (!currentUser) {
      return res.status(404).json({ message: `User not found with ID: ${id}` });
    }

    const hasChanges = Object.keys(updates).some(
      (key) => currentUser[key] !== updates[key]
    );

    if (!hasChanges) {
      return res.status(400).json({ message: "No changes detected" });
    }
    const updatedUser = await User.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({ isSuccess: true, user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error.message);
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

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const user = await User.findOne({ email });
    if (device_token) {
      user.device_token = device_token;
      user.save();
    }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }
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
  const { token, device_token } = req.body;

  if (!token) {
    return res.status(400).json({ message: "Google token is required" });
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email, name, picture } = ticket.getPayload();
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        userName: name,
        email,
        avatar: picture,
        password: "default",
        device_token: device_token || "",
      });
    } else if (device_token && user.device_token !== device_token) {
      user.device_token = device_token;
      await user.save();
    }

    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);

    return res.status(200).json({
      isSuccess: true,
      user,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error("Error during Google sign-in:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
