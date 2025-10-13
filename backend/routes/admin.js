// routes/admin.js
import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

// Dummy admin
const ADMIN = {
    username: "admin",
    password: "admin123", // gunakan hash kalau produksi
};

// POST /api/admin/login
router.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (username === ADMIN.username && password === ADMIN.password) {
        // generate token
        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1h" });
        return res.json({ token });
    }

    res.status(401).json({ message: "Username atau password salah" });
});

export default router;
