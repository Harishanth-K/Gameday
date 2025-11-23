// API service for authentication using DummyJSON
const AUTH_BASE_URL = 'https://dummyjson.com';

/**
 * Login user with credentials
 * @param {Object} credentials - User credentials
 * @param {string} credentials.username - Username
 * @param {string} credentials.password - Password
 * @returns {Promise} - Promise resolving to user data and token
 */
export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${AUTH_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: credentials.username,
        password: credentials.password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    const data = await response.json();
    
    return {
      token: data.accessToken || data.token,
      user: {
        id: data.id,
        username: data.username,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
      },
    };
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

/**
 * Register a new user using DummyJSON API
 * @param {Object} userData - User registration data
 * @param {string} userData.username - Username
 * @param {string} userData.email - Email
 * @param {string} userData.password - Password
 * @param {string} userData.firstName - First name
 * @param {string} userData.lastName - Last name
 * @returns {Promise} - Promise resolving to user data and token
 */
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${AUTH_BASE_URL}/users/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: userData.username,
        email: userData.email,
        password: userData.password,
        firstName: userData.firstName || userData.username,
        lastName: userData.lastName || 'User',
        age: 25, // DummyJSON requires age
        gender: 'male', // DummyJSON requires gender
        // Add other required fields for DummyJSON
        phone: '+1 234 567 890',
        birthDate: '1995-01-01',
        image: 'https://via.placeholder.com/150',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }

    const data = await response.json();
    
    // DummyJSON users/add returns the created user but no token
    // So we need to login after registration to get the token
    try {
      const loginResponse = await loginUser({
        username: userData.username,
        password: userData.password,
      });
      
      return loginResponse;
    } catch (loginError) {
      // If login fails, return the registered user with a mock token
      console.log('Auto-login failed, using mock token:', loginError.message);
      return {
        token: 'mock_token_' + Date.now(),
        user: {
          id: data.id,
          username: data.username,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
        },
      };
    }
  } catch (error) {
    console.error('Error during registration:', error);
    
    // Fallback to mock registration if real API fails
    console.log('Real registration failed, using mock implementation');
    return await registerUserMock(userData);
  }
};

/**
 * Mock implementation for registration (fallback)
 */
export const registerUserMock = async (userData) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user creation
    const mockUser = {
      id: Date.now(),
      username: userData.username,
      email: userData.email,
      firstName: userData.firstName || userData.username,
      lastName: userData.lastName || 'User',
    };
    
    const mockToken = 'mock_token_' + Date.now();
    
    return {
      token: mockToken,
      user: mockUser,
    };
  } catch (error) {
    console.error('Error during mock registration:', error);
    throw error;
  }
};

/**
 * Fetch current user profile
 * @param {string} token - Auth token
 * @returns {Promise} - Promise resolving to user profile data
 */
export const fetchUserProfile = async (token) => {
  try {
    const response = await fetch(`${AUTH_BASE_URL}/auth/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user profile');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

/**
 * Refresh authentication token
 * @param {string} refreshToken - Refresh token
 * @returns {Promise} - Promise resolving to new access token
 */
export const refreshAuthToken = async (refreshToken) => {
  try {
    const response = await fetch(`${AUTH_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        refreshToken: refreshToken,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }

    const data = await response.json();
    return data.accessToken || data.token;
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error;
  }
};