const Goal = require('../models/goalModel');
const User = require('../models/userModel');
const mongoose = require('mongoose');

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = async (req, res, next) => {
  const user_id = req.user.id;
  //console.log("Getting goals by user id: ",user_id);
  try {
    const goals = await Goal.find({ user_id });
    // console.log("Goals: ",goals);
    res.status(200).json(goals);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const setGoal = async (req, res, next) => {
  const {text, dueDate, priority, user} = req.body;
try {
    const user_id = req.user.id;
    const newGoal = new Goal({
      text,
      dueDate,
      priority,
      user: user_id,
    });
    await newGoal.save();
    res.status(201).json(newGoal);
} catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = async (req, res, next) => {
  const {id} = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such goal'})
  }

  try {
    const user_id = req.user.id;
    const goal = await Goal.findOneAndUpdate(
      { _id: id, user: user_id },
      { ...req.body },
      { new: true }      
    );
    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }
    res.status(200).json(goal);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error' });
};
}

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = async (req, res, next) => {
  const {id} = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such goal'})
  }
  try {
    const user_id = req.user.id;
    const goal = await Goal.findOneAndDelete({ _id: id, user: user_id });
    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }
    res.status(200).json({ message: 'Goal deleted' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};