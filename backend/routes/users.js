const express = require('express');
const User = require('../db/models/user.model');

const router = express.Router();

router.route('/').get(async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(400).json(`Error: ${error}`);
  }
});

router.route('/add').post(async (req, res) => {
  const { username } = req.body;

  const newUser = new User({ username });

  try {
    await newUser.save();
    res.json('User added!');
  } catch (error) {
    res.status(400).json(`Error: ${error}`);
  }
});

module.exports = router;
