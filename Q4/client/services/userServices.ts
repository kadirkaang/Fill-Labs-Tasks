import axios from "axios";

export interface User {
    CreatedAt: string | null;
    UpdatedAt: string | null;
    DeletedAt: string | null;
    ID: number | null;
    FirstName: string;
    LastName: string;
    Email: string;
}

const userService = {
    async getAllUsers(): Promise<User[]> {
        try {
            const response = await axios.get('http://127.0.0.1:8080/user');
            return response.data;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw new Error('Failed to fetch users');
        }
    },
    async addNewUser(userData: User): Promise<User> {
        console.log(userData);
        try {
            const response = await axios.post('http://127.0.0.1:8080/new_user', userData);
            return response.data;
        } catch (error) {
            console.error('Error adding user:', error);
            throw new Error('Failed to add user');
        }
    },
};

export default userService;