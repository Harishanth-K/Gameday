// Storage service for handling SecureStore and AsyncStorage
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Keys for storage
const AUTH_TOKEN_KEY = 'auth_token';
const USER_DATA_KEY = 'user_data';
const FAVORITES_KEY = 'favorites';

// Check if we're running on web
const isWeb = typeof document !== 'undefined';

/**
 * Save auth token securely
 * @param {string} token - Auth token to save
 */
export const saveAuthToken = async (token) => {
  try {
    if (isWeb) {
      // Use localStorage for web
      localStorage.setItem(AUTH_TOKEN_KEY, token);
    } else {
      // Use SecureStore for mobile
      await SecureStore.setItemAsync(AUTH_TOKEN_KEY, token);
    }
  } catch (error) {
    console.error('Error saving auth token:', error);
    throw error;
  }
};

/**
 * Get auth token from secure storage
 * @returns {Promise<string|null>} - Auth token or null
 */
export const getAuthToken = async () => {
  try {
    if (isWeb) {
      // Use localStorage for web
      return localStorage.getItem(AUTH_TOKEN_KEY);
    } else {
      // Use SecureStore for mobile
      const token = await SecureStore.getItemAsync(AUTH_TOKEN_KEY);
      return token;
    }
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

/**
 * Delete auth token from secure storage
 */
export const deleteAuthToken = async () => {
  try {
    if (isWeb) {
      // Use localStorage for web
      localStorage.removeItem(AUTH_TOKEN_KEY);
    } else {
      // Use SecureStore for mobile
      await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
    }
  } catch (error) {
    console.error('Error deleting auth token:', error);
    throw error;
  }
};

/**
 * Save user data securely
 * @param {Object} user - User data object
 */
export const saveUserData = async (user) => {
  try {
    if (isWeb) {
      // Use localStorage for web
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
    } else {
      // Use SecureStore for mobile
      await SecureStore.setItemAsync(USER_DATA_KEY, JSON.stringify(user));
    }
  } catch (error) {
    console.error('Error saving user data:', error);
    throw error;
  }
};

/**
 * Get user data from secure storage
 * @returns {Promise<Object|null>} - User data object or null
 */
export const getUserData = async () => {
  try {
    let userData;
    if (isWeb) {
      // Use localStorage for web
      userData = localStorage.getItem(USER_DATA_KEY);
    } else {
      // Use SecureStore for mobile
      userData = await SecureStore.getItemAsync(USER_DATA_KEY);
    }
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

/**
 * Delete user data from secure storage
 */
export const deleteUserData = async () => {
  try {
    if (isWeb) {
      // Use localStorage for web
      localStorage.removeItem(USER_DATA_KEY);
    } else {
      // Use SecureStore for mobile
      await SecureStore.deleteItemAsync(USER_DATA_KEY);
    }
  } catch (error) {
    console.error('Error deleting user data:', error);
    throw error;
  }
};

/**
 * Save favorites to AsyncStorage
 * @param {Array} favorites - Array of favorite items
 */
export const saveFavorites = async (favorites) => {
  try {
    if (isWeb) {
      // Use localStorage for web
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } else {
      // Use AsyncStorage for mobile
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }
  } catch (error) {
    console.error('Error saving favorites:', error);
    throw error;
  }
};

/**
 * Get favorites from AsyncStorage
 * @returns {Promise<Array>} - Array of favorites
 */
export const getFavorites = async () => {
  try {
    let favoritesJson;
    if (isWeb) {
      // Use localStorage for web
      favoritesJson = localStorage.getItem(FAVORITES_KEY);
    } else {
      // Use AsyncStorage for mobile
      favoritesJson = await AsyncStorage.getItem(FAVORITES_KEY);
    }
    return favoritesJson ? JSON.parse(favoritesJson) : [];
  } catch (error) {
    console.error('Error getting favorites:', error);
    return [];
  }
};

/**
 * Clear all favorites from storage
 */
export const clearFavorites = async () => {
  try {
    if (isWeb) {
      // Use localStorage for web
      localStorage.removeItem(FAVORITES_KEY);
    } else {
      // Use AsyncStorage for mobile
      await AsyncStorage.removeItem(FAVORITES_KEY);
    }
  } catch (error) {
    console.error('Error clearing favorites:', error);
    throw error;
  }
};

/**
 * Clear all stored data (logout)
 */
export const clearAllData = async () => {
  try {
    await deleteAuthToken();
    await deleteUserData();
    // Optionally clear favorites on logout
    // await clearFavorites();
  } catch (error) {
    console.error('Error clearing all data:', error);
    throw error;
  }
};