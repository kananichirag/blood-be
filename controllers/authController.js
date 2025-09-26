const User = require("../models/User");
const bcrypt = require('bcryptjs');

module.exports.Register = async (req, res) => {
    try {
        const { name, email, password, blood_group, location, age, gender, type } = req.body;

        if (!name || !email || !password || !blood_group || !location || !age || !gender || !type) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashPassword,
            blood_group,
            location,
            age,
            gender,
            type
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.log('✌️error --->', error);
        res.status(500).json({ message: "Server error" });
    }
}

module.exports.Login = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        console.log('✌️error --->', error);
        res.status(500).json({ message: "Server error" });
    }
}

module.exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ users });
    } catch (error) {
        console.log('✌️error --->', error);
        res.status(500).json({ message: "Server error" });
    }
}

module.exports.UpdateUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const { name, email, blood_group, location, age, gender, type } = req.body;
        const updatedUser = await User.findByIdAndUpdate(id, {
            name,
            email,
            blood_group,
            location,
            age,
            gender,
            type
        }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        console.log('✌️error --->', error);
        res.status(500).json({ message: "Server error" });
    }
}

module.exports.GetUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.log('✌️error --->', error);
        res.status(500).json({ message: "Server error" });
    }
}

module.exports.DeleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "User ID is required" });
        }
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }   
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {   
        console.log('✌️error --->', error);
        res.status(500).json({ message: "Server error" });
    }   
}