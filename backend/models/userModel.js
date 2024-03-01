const bcrypt = require('bcrypt');
const validator = require('validator');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { 
        type: String, 
        required: true,
        unique: true  
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    date_of_birth: {
        type: Date,
        required: true
    },

    phone_number: {
        type: String,
        required: true
    },
});




// static signup method
userSchema.statics.signup = async function(username, email, password, date_of_birth, phone_number) {

    // validation
    if (!username || !email || !password || !date_of_birth || !phone_number ) {
      throw Error('All fields must be filled');
    };

    if (!validator.isEmail(email)) {
      throw Error('Email not valid');
    };

    if (!validator.isStrongPassword(password)) {
      throw Error('Password not strong enough');
    };
    
    const exists = await this.findOne({ email });
    //const userExists = await this.findOne({ username});

    if (exists) {
      throw new Error('Email already in use');
    };
    /*if(userExists){
        res.status(400).json({message: 'User already exists'});
    };*/
  
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({username,email, password: hash, date_of_birth, phone_number});
    return user;
};

  // static login method
  userSchema.statics.login = async function(username, password) {
  
    if (!username || !password) {
      throw Error('All fields must be filled');
    };
  
    const user = await this.findOne({ username })
    if (!user) {
      throw Error('Incorrect user');
    };
  
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      throw Error('Incorrect password');
    };
  
    return user;
  };
  
 
module.exports = mongoose.model('User', userSchema);