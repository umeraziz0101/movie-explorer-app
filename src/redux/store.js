import {configureStore} from '@reduxjs/toolkit';
import moviesReducer from './moviesSlice';
import favoritesReducer from './favoritesSlice';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    favorites: favoritesReducer,
  },
});
