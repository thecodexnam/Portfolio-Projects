import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: null,
    loading: true,
    error: null,
    city: null,
    searchTerm: ''
  },
  reducers: {
    setUser: (state, action) => {
      state.userData = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearUser: (state) => {
      state.userData = null;
      state.loading = false;
      state.error = null;
      state.city = null;
    },
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { setUser, setLoading, setError, clearUser, setCity, setSearchTerm } = userSlice.actions;
export default userSlice.reducer;

