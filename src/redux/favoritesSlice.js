import {createSlice} from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {items: []},
  reducers: {
    loadFavorites(state, action) {
      state.items = action.payload; // from AsyncStorage
    },
    addFavorite(state, action) {
      state.items.push(action.payload);
    },
    removeFavorite(state, action) {
      state.items = state.items.filter(m => m.id !== action.payload);
    },
  },
});

export const {loadFavorites, addFavorite, removeFavorite} =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
