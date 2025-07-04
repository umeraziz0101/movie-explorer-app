import {configureStore} from '@reduxjs/toolkit';
import moviesReducer from './moviesSlice';
import favoritesReducer from './favoritesSlice';
import searchReducer from './searchSlice';
import filterReducer from './filterSlice';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    favorites: favoritesReducer,
    search: searchReducer,
    filters: filterReducer,
  },
});
