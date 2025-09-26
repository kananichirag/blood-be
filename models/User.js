const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    blood_group: { type: String, required: true },
    location: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    type: { type: String }
})

const User = mongoose.model('User', userSchema);

module.exports = User;