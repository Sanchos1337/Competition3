const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const generateToken = (_id) => {
  //console.log("Here Here",_id);
  return jwt.sign({ _id }, process.env.SECRET, {expiresIn: '3d'});
};

const registerUser = async (req, res) => {
  const { username, email, password, date_of_birth, phone_number } = req.body;
  //console.log("step 1");

  try{
    //console.log("step 2");
    const user = await User.signup(username, email, password, date_of_birth, phone_number);
    
    //console.log("step 3");
    /*
    if(userReg){
      console.log("step 6");
      res.status(201).json({
        _id: userReg._id,
        username: userReg.username,
        email: userReg.email,
        date_of_birth: userReg.date_of_birth,
        phone_number: userReg.phone_number,
        token: generateToken(userReg._id)
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    };
    */

    const token = generateToken(user._id);

    res.status(201).json({username, email, date_of_birth, phone_number, token});
  } catch (error) {
    res.status(500).json({error: error.message,});
  };
};

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res, next) => {
  const { username, password } = req.body

  try {
    const user = await User.login(username, password)
    
    const token = generateToken(user._id);

    res.status(200).json({username, token})
} catch (error) {
  res.status(400).json({error: error.message})
};

};

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler( async (req, res) => {
  res.status(200).json(req.user)
});

// get all users
const getUsers = async (req, res) => {
  const user_id = req.body._id

  try {
    const Users = await User.find({user_id}).sort({createdAt: -1})
    res.status(200).json(Users)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
}

module.exports = {
  registerUser,
  loginUser,
  getMe,
  getUsers
};