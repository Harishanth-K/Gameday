import { createSlice } from '@reduxjs/toolkit';

// Helper functions for theme storage
const THEME_KEY = 'theme_preference';

const saveThemePreference = async (theme) => {
  try {
    if (typeof document !== 'undefined') {
      // Web - use localStorage
      localStorage.setItem(THEME_KEY, theme);
    } else {
      // Mobile - use AsyncStorage
      const AsyncStorage = await import('@react-native-async-storage/async-storage');
      await AsyncStorage.default.setItem(THEME_KEY, theme);
    }
  } catch (error) {
    console.error('Error saving theme preference:', error);
  }
};

const getThemePreference = async () => {
  try {
    if (typeof document !== 'undefined') {
      // Web - use localStorage
      return localStorage.getItem(THEME_KEY);
    } else {
      // Mobile - use AsyncStorage
      const AsyncStorage = await import('@react-native-async-storage/async-storage');
      return await AsyncStorage.default.getItem(THEME_KEY);
    }
  } catch (error) {
    console.error('Error getting theme preference:', error);
    return null;
  }
};

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    themeOverride: null, // null means use system preference, 'light' or 'dark' to override
  },
  reducers: {
    setThemeOverride: (state, action) => {
      state.themeOverride = action.payload;
      // Save to storage when theme changes
      saveThemePreference(action.payload);
    },
    clearThemeOverride: (state) => {
      state.themeOverride = null;
      // Clear from storage
      saveThemePreference(null);
    },
    restoreThemePreference: (state, action) => {
      state.themeOverride = action.payload;
    },
  },
});

// Thunk to load theme preference on app start
export const loadThemePreference = () => async (dispatch) => {
  try {
    const savedTheme = await getThemePreference();
    if (savedTheme) {
      // Convert string 'null' back to actual null
      const theme = savedTheme === 'null' ? null : savedTheme;
      dispatch(themeSlice.actions.restoreThemePreference(theme));
    }
  } catch (error) {
    console.error('Error loading theme preference:', error);
  }
};

export const { setThemeOverride, clearThemeOverride } = themeSlice.actions;
export default themeSlice.reducer;