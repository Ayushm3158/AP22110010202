const API_BASE_URL = "http://localhost:5000"; // Backend URL

export const loginAndGetToken = async (username: string, password: string) => {
    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) throw new Error("Login failed");
        const data = await response.json();

        localStorage.setItem("authToken", data.token); // Store token
        return data.token;
    } catch (error) {
        console.error("Error during login:", error);
        return null;
    }
};

export const fetchUsers = async () => {
    const token = localStorage.getItem("authToken");
    try {
        const response = await fetch(`${API_BASE_URL}/users`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch users");
        return await response.json();
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
};

// ✅ Add fetchPosts function
export const fetchPosts = async () => {
    const token = localStorage.getItem("authToken");
    try {
        const response = await fetch(`${API_BASE_URL}/posts`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch posts");
        return await response.json();
    } catch (error) {
        console.error("Error fetching posts:", error);
        return [];
    }
};
