const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    scores: [Number]
});

module.exports = mongoose.model('user', userSchema);