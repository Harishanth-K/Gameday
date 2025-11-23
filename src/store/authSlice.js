import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as authAPI from '../services/authAPI';
import * as storageAPI from '../services/storageAPI';

// Async thunk for login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const { token, user } = await authAPI.loginUser(credentials);

      // Store token and user data securely
      await storageAPI.saveAuthToken(token);
      await storageAPI.saveUserData(user);

      return { token, user };
    } catch (error) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

// Async thunk for registration (mock implementation)
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const { token, user } = await authAPI.registerUser(userData);
      
      // Store token and user data securely
      await storageAPI.saveAuthToken(token);
      await storageAPI.saveUserData(user);

      return { token, user };
    } catch (error) {
      return rejectWithValue(error.message || 'Registration failed');
    }
  }
);

// Async thunk to restore session
export const restoreSession = createAsyncThunk(
  'auth/restoreSession',
  async (_, { rejectWithValue }) => {
    try {
      const token = await storageAPI.getAuthToken();
      const user = await storageAPI.getUserData();

      if (token && user) {
        return { token, user };
      }

      return rejectWithValue('No session found');
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for logout - FIXED VERSION
// Async thunk for logout
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      console.log('Clearing storage data...');
      await storageAPI.clearAllData();
      console.log('Storage cleared successfully');
      return true;
    } catch (error) {
      console.error('Error during logout:', error);
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
    isInitialized: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    // Add a manual logout reducer as backup
    manualLogout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Restore session
      .addCase(restoreSession.pending, (state) => {
        state.loading = true;
      })
      .addCase(restoreSession.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isInitialized = true;
      })
      .addCase(restoreSession.rejected, (state) => {
        state.loading = false;
        state.isInitialized = true;
      })
      // Logout - FIXED HANDLERS
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // Still clear local state even if storage cleanup fails
        state.user = null;
        state.token = null;
      });
  },
});

export const { clearError, manualLogout } = authSlice.actions;
export default authSlice.reducer;