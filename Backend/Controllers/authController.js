import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "../Models/User.js";

dotenv.config();

// Implement registration logic here
export const register = async (req, res) => {
  const { username, email, password } = req.body;

  // Basic validation
  if (!username || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  // You can add more validation like email format, password strength, etc.
  if (password.length < 6) {
    return res
      .status(400)
      .json({ msg: "Password must be at least 6 characters" });
  }
  if (!email.includes("@")) {
    return res.status(400).json({ msg: "Please enter a valid email" });
  }
  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ msg: "User already exists" });
  }

  // Hash password before saving
  const hashedPassword = await bcrypt.hash(password, 10);
  // Create new user object
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });
  // Save user to database
  await newUser.save();
  // You can also generate a JWT token here and send it in the response
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.header("auth-token", token);
  res.cookie("token", token, { httpOnly: true });
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  // Return success response
  res.status(201).json({ token, msg: "User registered successfully" });
};

// Implement login logic here
export const login = async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ msg: "User does not exist" });
  }
  // Validate password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ msg: "Invalid credentials" });
  }
  // Generate JWT token expire in 1 week
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1w",
  });
  res.header("auth-token", token);
  res.cookie("token", token, { httpOnly: true });
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
  res.status(200).json({ token, msg: "User logged in successfully" });
};

// logout logic
export const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ msg: "User logged out successfully" });
};
