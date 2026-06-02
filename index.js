const express = require('express');
const db = require('./db');
require('dotenv').config();

const app = express();
app.use(express.json()); // CRITICAL: This allows Node to read JSON from Postman

// GET all users
app.get('/users', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM users");
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST a new user
app.post('/users', async (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) return res.status(400).json({ message: "Name and Email required" });

    try {
        await db.query("INSERT INTO users (name, email) VALUES (?, ?)", [name, email]);
        res.status(201).json({ message: "User saved to MySQL successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});