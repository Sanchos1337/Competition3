const mongoose = require('mongoose')

const goalSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },

    dueDate: {
        type: Date,
        required: true
    },

    priority: {
        type: String,
        required: true
    },

    user: {
        type: String,
        required: true
    }
});

const Goal = mongoose.model('Goal', goalSchema);

module.exports = Goal;