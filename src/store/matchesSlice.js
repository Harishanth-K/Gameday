import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as matchesAPI from '../services/matchesAPI';

// Async thunk to fetch upcoming matches
export const fetchUpcomingMatches = createAsyncThunk(
  'matches/fetchUpcoming',
  async (leagueId = '4328', { rejectWithValue }) => {
    try {
      const matches = await matchesAPI.fetchUpcomingMatches(leagueId);
      return matches;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch matches');
    }
  }
);

// Async thunk to fetch past matches
export const fetchPastMatches = createAsyncThunk(
  'matches/fetchPast',
  async (leagueId = '4328', { rejectWithValue }) => {
    try {
      const matches = await matchesAPI.fetchPastMatches(leagueId);
      return matches;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch matches');
    }
  }
);

// Async thunk to fetch match details
export const fetchMatchDetails = createAsyncThunk(
  'matches/fetchDetails',
  async (matchId, { rejectWithValue }) => {
    try {
      const match = await matchesAPI.fetchMatchDetails(matchId);
      return match;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch match details');
    }
  }
);

const matchesSlice = createSlice({
  name: 'matches',
  initialState: {
    upcomingMatches: [],
    pastMatches: [],
    selectedMatch: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedMatch: (state) => {
      state.selectedMatch = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch upcoming matches
      .addCase(fetchUpcomingMatches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUpcomingMatches.fulfilled, (state, action) => {
        state.loading = false;
        state.upcomingMatches = action.payload;
      })
      .addCase(fetchUpcomingMatches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch past matches
      .addCase(fetchPastMatches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPastMatches.fulfilled, (state, action) => {
        state.loading = false;
        state.pastMatches = action.payload;
      })
      .addCase(fetchPastMatches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch match details
      .addCase(fetchMatchDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMatchDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedMatch = action.payload;
      })
      .addCase(fetchMatchDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedMatch, clearError } = matchesSlice.actions;
export default matchesSlice.reducer;
