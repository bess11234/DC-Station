const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) return res.status(401).json({message: "Access Denied"});

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // เพิ่มข้อมูล userId เข้า req
        next();
    } catch (err) {
        res.status(400).json({ message: "Invalid Token" });
    }
};

module.exports = authMiddleware;
