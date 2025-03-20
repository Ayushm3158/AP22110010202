import { useEffect, useState } from "react";
import { fetchPosts, fetchUsers } from "./services/apiService";

function App() {
    const [posts, setPosts] = useState<any[]>([]);
    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        fetchPosts().then(setPosts);
        fetchUsers().then(setUsers);
    }, []);

    return (
        <div style={{ padding: "20px", fontFamily: "Arial" }}>
            <h1>Social Media Analytics</h1>

            <h2>Users</h2>
            {users.length > 0 ? (
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>{user.name}</li>
                    ))}
                </ul>
            ) : (
                <p>Loading users...</p>
            )}

            <h2>Posts</h2>
            {posts.length > 0 ? (
                <ul>
                    {posts.map((post) => (
                        <li key={post.id}>{post.title}</li>
                    ))}
                </ul>
            ) : (
                <p>Loading posts...</p>
            )}
        </div>
    );
}

export default App;
