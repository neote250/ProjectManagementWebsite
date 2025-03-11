// src/services/api.js - Service for communicating with the Flask API

import axios from 'axios';

// Base URL for the API - can be read from environment variables in production
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/';

// /**
//  * Fetch all users from the API
//  * @returns {Promise<Array>} Promise resolving to array of users
//  */
// export const fetchUsers = async () => {
//   try {
//     // Make GET request to the users endpoint
//     const response = await axios.post(`${API_URL}/users`, {});
    
//     // Parse the response data as the Flask backend returns BSON data as a string
//     return JSON.parse(response.data);
//   } catch (error) {
//     // Log and rethrow the error for handling in components
//     console.error('Error fetching users:', error);
//     throw error;
//   }
// };

/**
 * Create a new user via the API
 * @param {Object} user - The user to create
 * @returns {Promise<Object>} Promise resolving to the created user's ID
 */
export const createUser = async (user) => {
  try {
    // Make POST request to create a new user
    const response = await axios.post(`${API_URL}/users`, user);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

/**
 * Update an existing user via the API
 * @param {string} id - The ID of the user to update
 * @param {Object} user - The updated user data
 * @returns {Promise<Object>} Promise resolving to success status
 */
export const updateUser = async (id, user) => {
  try {
    // Make PUT request to update an existing user
    const response = await axios.put(`${API_URL}/users/${id}`, user);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

/**
 * Delete an user via the API
 * @param {string} id - The ID of the user to delete
 * @returns {Promise<Object>} Promise resolving to success status
 */
export const deleteUser = async (id) => {
  try {
    // Make DELETE request to remove an user
    const response = await axios.delete(`${API_URL}/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};