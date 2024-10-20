
const jwt = require("jsonwebtoken");
const RefreshToken = require("./../../models/refresh_token");

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;


const createAccessToken = (user) => {
  return jwt.sign({ userId: user._id, email: user.email }, accessTokenSecret, {
    expiresIn: "15m",
    algorithm: "HS256",
  });
};

const createRefreshToken = (user) => {
  return jwt.sign(
    { userId: user._id, email: user.email },
    refreshTokenSecret,
    { expiresIn: "7d", algorithm: "RS256" } 
  );
};

const saveRefreshToken = async (token, userId) => {
  await RefreshToken.create({
    token,
    userId,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, accessTokenSecret);
};

const verifyRefreshToken = (token) => {
  return jwt.verify(token, refreshTokenSecret);
};

module.exports = {
  createAccessToken,
  createRefreshToken,
  saveRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
