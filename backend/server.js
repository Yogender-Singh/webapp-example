const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const cors = require('cors');

app.use(cors());
app.use(express.json());

const JWT_SECRET = 'secret';

const url = 'mongodb+srv://syogender799:root@cluster0.botlznh.mongodb.net/weather?retryWrites=true&w=majority';

// Connect to MongoDB database
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
// Define a user schema
const userSchema = new mongoose.Schema({
    name: String,
    email: {
      type: String,
      unique: true, // make sure email is unique
    },
    password: String,
  });
  
  // Create a User model based on the user schema
  const User = mongoose.model('User', userSchema);
  
  app.get('/', (req, res) => {
    res.send('Welcome to Node!');
  });

  // Sign up API
  app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email ||  !password) {
      return res.status(400).send('Email, name, and password are required.');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const user = new User({ name, email, password: hashedPassword });
      await user.save();
      console.log(`Inserted user with _id: ${user._id}`);
      res.sendStatus(201);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error creating user');
    }
  });
  
  // Sign in API
  app.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.sendStatus(401);
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.sendStatus(401);
      }
      const token = jwt.sign({ email: user.email }, JWT_SECRET);
      res.json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error signing in');
    }
  });

// Sign in user as per email address
  app.get('/user', async (req, res) => {
    const { email } = req.query;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).send('User not found');
      }
      res.send(user);
    } catch (error) {
      console.log(error);
      res.status(500).send('Error getting user');
    }
  });

// Start the server
app.listen(5000, () => {
    console.log("Server running on 5000");
});