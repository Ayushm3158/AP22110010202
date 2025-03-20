const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const BASE_URL = process.env.TEST_SERVER_URL;
let ACCESS_TOKEN = "";

// Function to Authenticate and Get Token
const authenticate = async () => {
    try {
        const response = await axios.post(`${BASE_URL}/auth`, {
            companyName: "Affordmed",
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            ownerName: process.env.OWNER_NAME,
            ownerEmail: process.env.OWNER_EMAIL,
            rollNo: process.env.ROLL_NO
        });
        
        ACCESS_TOKEN = response.data.access_token;
        console.log("✅ Authentication Successful!");
    } catch (error) {
        console.error("❌ Error Authenticating:", error.response?.data || error.message);
        throw error;
    }
};

// Headers with Dynamic Token
const getAuthHeaders = () => ({
    "Authorization": `Bearer ${ACCESS_TOKEN}`,
    "Content-Type": "application/json"
});

// Fetch All Users
const getUsers = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/users`, { headers: getAuthHeaders() });
        return response.data.users;
    } catch (error) {
        console.error("❌ Error Fetching Users:", error.response?.data || error.message);
        throw error;
    }
};

// Fetch Posts for a User
const getUserPosts = async (userId) => {
    try {
        const response = await axios.get(`${BASE_URL}/users/${userId}/posts`, { headers: getAuthHeaders() });
        return response.data.posts;
    } catch (error) {
        console.error(`❌ Error Fetching Posts for User ${userId}:`, error.response?.data || error.message);
        throw error;
    }
};

// Fetch Comments for a Post
const getPostComments = async (postId) => {
    try {
        const response = await axios.get(`${BASE_URL}/posts/${postId}/comments`, { headers: getAuthHeaders() });
        return response.data.comments;
    } catch (error) {
        console.error(`❌ Error Fetching Comments for Post ${postId}:`, error.response?.data || error.message);
        throw error;
    }
};

module.exports = { authenticate, getUsers, getUserPosts, getPostComments };
