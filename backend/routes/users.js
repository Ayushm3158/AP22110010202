const express = require("express");
const router = express.Router();
const { getUsers } = require("../services/apiService");

// API to Get All Users
router.get("/", async (req, res) => {
    try {
        const users = await getUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
