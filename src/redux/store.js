import {configureStore} from '@reduxjs/toolkit';
import moviesReducer from './moviesSlice';
import favoritesReducer from './favoritesSlice';
import searchReducer from './searchSlice';
import filterReducer from './filterSlice';
import movieDetailsReducer from './movieDetailsSlice';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    movie: movieDetailsReducer,
    favorites: favoritesReducer,
    search: searchReducer,
    filters: filterReducer,
  },
});
