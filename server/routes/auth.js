const express = require("express");
const bcrypt =require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models");

const router = express.Router();

// Sample route for user registration
router.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create a new user
        const newUser = new User({ email, password });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

//Login Route
router.post("/login", async (req, res) => {
    const {email, password} = req.body;

    try{
        //find email from mongoDB
        const user = await User.findOne({email});

        //1. not found
        if (!user) return res.status(400).json({msg: "Email not founded"});

        //2. found then check password
        const isMatch = (password == user.password)
        // const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({msg: "Invalid Password"});

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET,{
            expiresIn: "1m",
        })

        res.json({ token, user: {id: user._id, email: user.email}});
    }
    catch(error){
        res.status(500).json({ message: error.message});
    }
})

module.exports = router;