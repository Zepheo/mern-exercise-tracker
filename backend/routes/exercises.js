const express = require('express');
const Exercise = require('../db/models/exercise.model');

const router = express.Router();

router.route('/').get(async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.json(exercises);
  } catch (error) {
    res.status(400).json(`Error: ${error}`);
  }
});

router.route('/add').post(async (req, res) => {
  const {
    username, description, duration, date,
  } = req.body;
  const parsedDuration = Number(duration);
  const parsedDate = Date.parse(date);

  const newExercise = new Exercise({
    username, description, duration: parsedDuration, date: parsedDate,
  });

  try {
    await newExercise.save();
    res.json('Exercise added!');
  } catch (error) {
    res.status(400).json(`Error: ${error}`);
  }
});

router.route('/:id').get(async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    res.json(exercise);
  } catch (error) {
    res.status(400).json(`Error: ${error}`);
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    await Exercise.findByIdAndDelete(req.params.id);
    res.json('Exercise deleted.');
  } catch (error) {
    res.status(400).json(`Error: ${error}`);
  }
});

router.route('/update/:id').post(async (req, res) => {
  try {
    const {
      username, description, duration, date,
    } = req.body;
    const parsedDuration = Number(duration);
    const parsedDate = Date.parse(date);

    const exercise = await Exercise.findById(req.params.id);

    exercise.username = username;
    exercise.description = description;
    exercise.duration = parsedDuration;
    exercise.date = parsedDate;

    await exercise.save();
    res.json('Exercise updated!');
  } catch (error) {
    res.status(400).json(`Error: ${error}`);
  }
});

module.exports = router;
