import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as storageAPI from '../services/storageAPI';

// Async thunk to load favorites from storage
export const loadFavorites = createAsyncThunk(
  'favorites/load',
  async (_, { rejectWithValue }) => {
    try {
      const favorites = await storageAPI.getFavorites();
      return favorites;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to save favorites to storage
export const saveFavorites = createAsyncThunk(
  'favorites/save',
  async (favorites, { rejectWithValue }) => {
    try {
      await storageAPI.saveFavorites(favorites);
      return favorites;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    addFavorite: (state, action) => {
      const match = action.payload;
      const exists = state.items.find(item => item.idEvent === match.idEvent);
      if (!exists) {
        state.items.push(match);
      }
    },
    removeFavorite: (state, action) => {
      const matchId = action.payload;
      state.items = state.items.filter(item => item.idEvent !== matchId);
    },
    clearFavorites: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadFavorites.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(loadFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(saveFavorites.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export const { addFavorite, removeFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
