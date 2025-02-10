const express = require("express");
const bcrypt =require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
// const cookieParser = require("cookie-parser");

const router = express.Router();

// registration
router.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Encrypt
        // const salt = await bcrypt.getSalt(10);
        // const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        // const newUser = new User({email, password: hashedPassword});
        const newUser = new User({ email, password });
        await newUser.save();

        res.status(201).json({ staus: "ok" , message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({  status: "error", message: "Server error" });
    }
});

//Login Route
router.post("/login", async (req, res) => {;
    try{
        const {email, password} = req.body;

        //Search email from mongoDB
        const user = await User.findOne({email});

        //1. not found
        if (!user) return res.status(400).json({msg: "Email not founded"});

        //2. found then check password
        const isMatch = (password == user.password)
        // const isMatch = await bcrypt.compare(password, user.password);
        
        if(!isMatch) return res.status(400).json({msg: "Invalid Password"});

        //3. Create JWT Token
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET,{
            expiresIn: "5m",
        });

        console.log("Check if authen success: ", token);
        //2. Send Token in HTTP-only Cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // ใช้ secure บน production
            sameSite: "Strict",
            maxAge: 3600000, // 1 ชั่วโมง
        });

        res.json({ message: "Login successful" });
        // res.json({ token, user: {id: user._id, email: user.email}});
    }
    catch(error){
        res.status(500).json({ message: error.message});
    }
});

//Check Login Status
router.get("/me", (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.json({ userId: decoded.userId });
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
});

//LogOut
router.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.json({message: "Logged out successfully"});
})

//Profile
const authMiddleware = require("../middleware/authMiddleware");

router.get("/profile", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select("-password"); // เอาข้อมูลมา แต่ไม่รวม password
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;