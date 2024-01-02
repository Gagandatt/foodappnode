// controllers/userController.js
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userController = {
  // Function to create a new user
  signup: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      // Check if the email is already registered
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email is already in use' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });

      // Save the user to the database
      await newUser.save();

      res.json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }

  //   {
  //     "username":"gagan321",
  //     "email":"john_Gagan@gmail.com",
  //     "password":"gagan"
  // }
  },
  
  signin: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Check the password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Generate a JWT token for authentication
      const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });

      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  // Function to get a user by ID
  getUser: async (req, res) => {
    const userId = req.params.userId;

    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  // Function to update a user by ID
  updateUser: async (req, res) => {
    const userId = req.params.userId;
    const updatedData = req.body; // Assuming you send the updated data in the request body

    try {
      const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  // Function to delete a user by ID
  deleteUser: async (req, res) => {
    const userId = req.params.userId;

    try {
      const deletedUser = await User.findByIdAndDelete(userId);
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  // ... other user-related functions
};

module.exports = userController;
