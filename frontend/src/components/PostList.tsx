import { useEffect, useState } from "react";
import { fetchPosts } from "../services/apiService";

interface Post {
    id: number;
    title: string;
    content: string;
}

const PostList = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        fetchPosts().then(setPosts);
    }, []);

    return (
        <div>
            <h2>Posts</h2>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}><strong>{post.title}</strong>: {post.content}</li>
                ))}
            </ul>
        </div>
    );
};

export default PostList;
