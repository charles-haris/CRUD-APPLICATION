import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

const ApiService = {
    // Get all students
    getStudents: async () => {
        try {
            const response = await axios.get(`${API_URL}/students`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Get a specific student
    getStudent: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/students/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Create a new student
    createStudent: async (studentData) => {
        try {
            const response = await axios.post(`${API_URL}/students`, studentData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Update a student
    updateStudent: async (id, studentData) => {
        try {
            const response = await axios.put(`${API_URL}/students/${id}`, studentData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Delete a student
    deleteStudent: async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/students/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

export default ApiService;