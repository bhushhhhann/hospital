const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getConnection, closeConnection } = require('../models/db');

// Register a new user
const register = async (req, res) => {
  try {
    const { email, password, name, role } = req.body;
    
    // Validate input
    if (!email || !password || !name) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const connection = await getConnection();
    // Query to check if user exists
    // Query to insert new user
    await closeConnection(connection);
    
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }
    
    const connection = await getConnection();
    // Query to get user by email
    // Compare password
    // Generate JWT token
    const token = jwt.sign(
      { userId: 'user_id', email: email, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );
    
    await closeConnection(connection);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Verify token
const verifyToken = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ valid: true, user: decoded });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = {
  register,
  login,
  verifyToken
};
