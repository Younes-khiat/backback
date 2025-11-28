const Users = require('../models/users');
const validator = require('validator');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
// const sendEmail = require('../utils/email');

const register = async (req, res) => {
  try {
    const requiredFields = ['firstName', 'lastName', 'phone', 'password'];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ message: `Missing required field: ${field}` });
      }
    }

    const { firstName, lastName, phone, password } = req.body;

    // Check if user exists
    const existingUser = await Users.findOne({ phone });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Password strength check
    if (!validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1
    })) {
      return res.status(400).json({
        message: 'Password must be at least 8 characters and include lowercase, uppercase, number, and symbol'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user with hashed password
    const newUser = new Users({ firstName, lastName, phone, password: hashedPassword });
    await newUser.save();

    // Return user without password
    const { password: _, ...safeUser } = newUser.toObject();
    res.status(201).json(safeUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating user' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { phone, password } = req.body; 
    const user = await Users.findOne({ phone });
    if (!user) {
      return res.status(401).json({ message: 'Invalid phone or password' });
    }
    console.log(user);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid phone or password' });
    }
    console.log(user._id);
    res.status(200).json(user._id);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in' });
  }
  // Login logic here
};

module.exports = {
  register,
  loginUser
};