import { useEffect } from "react";
import { loginAndGetToken, fetchUsers } from "./services/apiService";

const App = () => {
    useEffect(() => {
        const authenticate = async () => {
            const token = await loginAndGetToken("admin", "password123"); // Replace with valid credentials
            if (token) {
                console.log("Logged in successfully!");
                fetchUsers(); // Now fetch users with a valid token
            }
        };

        authenticate();
    }, []);

    return <h1>Social Media Analytics</h1>;
};

export default App;
