import { useEffect, useState } from "react";
import { fetchUsers } from "../services/apiService";

interface User {
    id: number;
    name: string;
    email: string;
}

const UserList = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        fetchUsers().then(setUsers);
    }, []);

    return (
        <div>
            <h2>Users</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>{user.name} - {user.email}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
