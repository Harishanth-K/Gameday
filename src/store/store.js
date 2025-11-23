import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import matchesReducer from './matchesSlice';
import favoritesReducer from './favoritesSlice';
import themeReducer from './themeSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    matches: matchesReducer,
    favorites: favoritesReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
