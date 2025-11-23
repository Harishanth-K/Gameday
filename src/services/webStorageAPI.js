// Web-compatible storage for browser
export const saveAuthToken = async (token) => {
  try {
    localStorage.setItem('auth_token', token);
    return true;
  } catch (error) {
    console.log('Error saving auth token:', error);
    return false;
  }
};

export const getAuthToken = async () => {
  try {
    return localStorage.getItem('auth_token');
  } catch (error) {
    console.log('Error getting auth token:', error);
    return null;
  }
};

export const deleteAuthToken = async () => {
  try {
    localStorage.removeItem('auth_token');
    return true;
  } catch (error) {
    console.log('Error deleting auth token:', error);
    return false;
  }
};

export const saveUserData = async (user) => {
  try {
    localStorage.setItem('user_data', JSON.stringify(user));
    return true;
  } catch (error) {
    console.log('Error saving user data:', error);
    return false;
  }
};

export const getUserData = async () => {
  try {
    const userData = localStorage.getItem('user_data');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.log('Error getting user data:', error);
    return null;
  }
};

export const saveFavorites = async (favorites) => {
  try {
    localStorage.setItem('favorites', JSON.stringify(favorites));
    return true;
  } catch (error) {
    console.log('Error saving favorites:', error);
    return false;
  }
};

export const getFavorites = async () => {
  try {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.log('Error getting favorites:', error);
    return [];
  }
};

export const clearAllData = async () => {
  try {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    localStorage.removeItem('favorites');
    return true;
  } catch (error) {
    console.log('Error clearing data:', error);
    return false;
  }
};