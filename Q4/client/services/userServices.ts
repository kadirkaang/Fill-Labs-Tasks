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

// Service for interacting with user-related API endpoints
const userService = {
    // Fetch all users from the API
    async getAllUsers(): Promise<User[]> {
        try {
            const response = await axios.get('http://127.0.0.1:8080/user');
            return response.data;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw new Error('Failed to fetch users');
        }
    },

    // Add a new user to the API
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

    // Fetch user data by their IDs from the API
    async getUsersById(userIds: number[]): Promise<User> {
        try {
            const response = await axios.get(`http://127.0.0.1:8080/users/${userIds.join(',')}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching user with ID ${userIds}:`, error);
            throw new Error('Failed to fetch user');
        }
    },

    // Delete users by their IDs from the API
    async deleteUsersByIds(userIds: number[]) {
        try {
            const response = await axios.delete(`http://127.0.0.1:8080/delete_users/${userIds.join(',')}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting users with IDs ${userIds}:`, error);
            throw new Error('Failed to delete users');
        }
    },

    // Update a user's data in the API
    async updateUser(userId: number, updatedUser: User) {
        try {
            const response = await axios.put(`http://127.0.0.1:8080/update_user/${userId}`, updatedUser)
            return response.data
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    }
};

export default userService;