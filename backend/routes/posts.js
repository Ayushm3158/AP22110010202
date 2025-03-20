const express = require("express");
const router = express.Router();
const { getUsers, getUserPosts, getPostComments } = require("../services/apiService");

// API to Get Popular/Latest Posts
router.get("/", async (req, res) => {
    try {
        const type = req.query.type;
        if (!type || (type !== "popular" && type !== "latest")) {
            return res.status(400).json({ error: "Invalid query parameter" });
        }

        const users = await getUsers();
        let allPosts = [];

        for (let user of users) {
            const posts = await getUserPosts(user.id);
            allPosts = allPosts.concat(posts);
        }

        if (type === "popular") {
            let postCommentCounts = await Promise.all(
                allPosts.map(async (post) => {
                    const comments = await getPostComments(post.id);
                    return { ...post, commentCount: comments.length };
                })
            );

            postCommentCounts.sort((a, b) => b.commentCount - a.commentCount);
            const maxCount = postCommentCounts[0]?.commentCount || 0;

            return res.json(postCommentCounts.filter(post => post.commentCount === maxCount));
        }

        if (type === "latest") {
            allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
            return res.json(allPosts.slice(0, 5));
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
