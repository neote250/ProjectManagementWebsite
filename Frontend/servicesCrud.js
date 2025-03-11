// src/services/apiService.js - CRUD operations for interacting with Flask API

import axios from 'axios';

// Base URL from environment variable or default to localhost
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/';

/**
 * Service class for handling CRUD operations with the Flask API
 */
class ApiService {
  /**
   * Create a new user
   * @param {Object} userData - Data for the new user
   * @returns {Promise} - Promise resolving to the created user info
   */
  static async createUser(userData) {
    // if(token != expectedToken) return;

    try {
      // Send POST request to create an user
      const response = await axios.post(`${API_URL}/users`, userData);
      return response.data;
    } catch (error) {
      // Handle and rethrow error with additional context
      this._handleError(error, 'Error creating user');
    }
  }

  /**
   * Fetch all items
   * @param {Number} limit - Optional limit on the number of items to return
   * @returns {Promise} - Promise resolving to array of items
   */
  static async getAllItems(limit = 0) {
    try {
      // Build URL with optional limit parameter
      const url = limit > 0 ? `${API_URL}/items?limit=${limit}` : `${API_URL}/items`;
      
      // Send GET request to fetch items
      const response = await axios.get(url);
      
      // Parse the response data (Flask returns serialized BSON)
      return JSON.parse(response.data);
    } catch (error) {
      this._handleError(error, 'Error fetching items');
    }
  }

  /**
   * Fetch a single user by ID
   * @param {String} id - The ID of the user to fetch
   * @returns {Promise} - Promise resolving to the user data
   */
  static async getUserById(id) {
    try {
      // Send GET request to fetch a specific user
      const response = await axios.get(`${API_URL}/users/${id}`);
      
      // Parse the response data
      return JSON.parse(response.data);
    } catch (error) {
      this._handleError(error, 'Error fetching user');
    }
  }

  /**
   * Update an existing user
   * @param {String} id - The ID of the user to update
   * @param {Object} userData - The updated user data
   * @returns {Promise} - Promise resolving to the update result
   */
  static async updateUser(id, userData) {
    try {
      // Send PUT request to update an user
      const response = await axios.put(`${API_URL}/users/${id}`, userData);
      return response.data;
    } catch (error) {
      this._handleError(error, 'Error updating user');
    }
  }

  /**
   * Delete a user
   * @param {String} id - The ID of the user to delete
   * @returns {Promise} - Promise resolving to the deletion result
   */
  static async deleteUser(id) {
    try {
      // Send DELETE request to remove an user
      const response = await axios.delete(`${API_URL}/users/${id}`);
      return response.data;
    } catch (error) {
      this._handleError(error, 'Error deleting user');
    }
  }

  /**
   * Handle and standardize API errors
   * @private
   * @param {Error} error - The caught error
   * @param {String} defaultMessage - Default message if error details unavailable
   * @throws {Error} - Rethrown error with additional context
   */
  static _handleError(error, defaultMessage) {
    // Extract the most useful error message
    const errorMessage = error.response?.data?.error || 
                         error.response?.data?.message || 
                         error.message || 
                         defaultMessage;
    
    // Create a new error with the extracted message
    const enhancedError = new Error(errorMessage);
    
    // Add the original error and response for debugging
    enhancedError.originalError = error;
    enhancedError.response = error.response;
    
    // Log error for debugging
    console.error(`${defaultMessage}:`, error);
    
    // Throw the enhanced error
    throw enhancedError;
  }
}

export default ApiService;