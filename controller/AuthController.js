const User = require("../model/User");
const authService = require("../services/auth");
const { JWT } = require("../config/authContants");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const logger = require("../config/logger");
const { default: mongoose } = require("mongoose");
const register = async (req, res) => {
  try {
    const { email, password, first_name, last_name } = req.body;
    let newPassword = await authService.encryptPassword(password);
    const user = new User({
      email,
      password: newPassword,
      first_name,
      last_name,
    });
    await user.save();
    const token = await authService.generateToken(
      user,
      process.env.JWT_SECRET,
      JWT.EXPIRES_IN * 60
    );
    user.set("token", token, { strict: false });
    res.setHeader("Authorization", `Bearer ${token}`);
    return res.status(200).json(user);
  } catch (error) {
    logger.error(error.message);
    return res.status(401).json({ data: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordMatched = await comparePassword(password, user.password);
    if (!isPasswordMatched) {
      return res.status(400).json({
        data: null,
        message: "Incorrect Password",
      });
    }
    const token = await authService.generateToken(
      user,
      process.env.JWT_SECRET,
      JWT.EXPIRES_IN * 60
    );
    user.set("token", token, { strict: false });
    res.setHeader("Authorization", `Bearer ${token}`);
    return res.status(200).json(user);
  } catch (error) {
    logger.error(error.message);
    return res.status(401).json({ data: error.message });
  }
};
const getProfile = async (req, res) => {
  try {
    // Extract the JWT token from the Authorization header
    const token = req.headers.authorization?.split(" ")[1]; // Assuming the token is sent as 'Bearer <token>'

    if (!token) {
      return res.status(401).json({ message: "Token is missing" });
    }

    // Decode the JWT token to get the user data
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const userId = decodedToken.id;
 
    const user = await User.findOne({_id:new mongoose.Types.ObjectId(userId)});
    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Return the user data in the response
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const comparePassword = async (password, encryptedPassword) => {
  try {
    return await bcrypt.compare(password, encryptedPassword);
  } catch (error) {
    return false;
  }
};

module.exports = {
  register,
  login,
  getProfile,
};
