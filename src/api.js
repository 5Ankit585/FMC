// src/api.js
import axios from "axios";

// Base URL of your backend
const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

// Function to save a student
export const saveStudent = async (studentData) => {
  try {
    const response = await API.post("/students", studentData);
    return response.data; // { message: "Student saved successfully!" }
  } catch (error) {
    throw error; // Let the component handle the error
  }
};

// Function to get all students
export const getStudents = async () => {
  try {
    const response = await API.get("/students");
    return response.data; // Array of students
  } catch (error) {
    throw error;
  }
};
