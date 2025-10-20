import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import apiService from '../services/api';

const initialState = {
  carousels: [],
  loading: false,
  error: null,
  isAuthenticated: false,
  videoPlayer: {
    visible: false,
    videoUrl: null,
    title: null,
  },
};

// Async thunk get carousels
export const fetchCarouselData = createAsyncThunk(
  'carousels/fetchData',
  async (_, {rejectWithValue}) => {
    try {
      const data = await apiService.getCarouselData();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Async thunk login
export const login = createAsyncThunk(
  'auth/login',
  async (_, {rejectWithValue}) => {
    try {
      const data = await apiService.login();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const carouselSlice = createSlice({
  name: 'carousels',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },

    showVideoPlayer: (state, action) => {
      state.videoPlayer = {
        visible: true,
        videoUrl: action.payload.videoUrl,
        title: action.payload.title,
      };
    },

    hideVideoPlayer: state => {
      state.videoPlayer = {
        visible: false,
        videoUrl: null,
        title: null,
      };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, state => {
        state.loading = false;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      })

      .addCase(fetchCarouselData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCarouselData.fulfilled, (state, action) => {
        state.loading = false;
        state.carousels = action.payload;
        state.error = null;
      })
      .addCase(fetchCarouselData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const {clearError, showVideoPlayer, hideVideoPlayer} =
  carouselSlice.actions;

// Selectors
export const selectCarousels = state => state.carousels.carousels;
export const selectLoading = state => state.carousels.loading;
export const selectError = state => state.carousels.error;
export const selectIsAuthenticated = state => state.carousels.isAuthenticated;
export const selectVideoPlayer = state => state.carousels.videoPlayer;

export default carouselSlice.reducer;
