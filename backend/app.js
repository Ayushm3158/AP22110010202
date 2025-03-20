
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { authenticate, getAuthToken } = require("./services/apiService");
const userRoutes = require("./routes/users");
const postRoutes = require("./routes/posts");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Middleware to verify authentication before accessing routes
const authMiddleware = async (req, res, next) => {
    try {
        const token = await getAuthToken(); // Get token from authentication service
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token found" });
        }
        req.authToken = token;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Authentication failed", error: error.message });
    }
};

// Authenticate and Start Server
authenticate().then(() => {
    console.log("✅ Authentication Successful!");

    // Apply authentication middleware to protect routes
    app.use("/users", authMiddleware, userRoutes);
    app.use("/posts", authMiddleware, postRoutes);

    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
}).catch(err => {
    console.error("❌ Authentication failed:", err.message);
});

