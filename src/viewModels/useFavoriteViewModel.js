// src/viewModels/useFavoriteViewModel.js
import {useCallback, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import storage from '../services/storage';
import {loadFavorites, removeFavorite as rmFav} from '../redux/favoritesSlice';

export function useFavoriteViewModel() {
  const dispatch = useDispatch();
  const moviesFavorite = useSelector(state => state.favorites.items);
  const loading = useSelector(state => state.favorites.loading);

  useEffect(() => {
    storage.getFavorites().then(list => {
      dispatch(loadFavorites(list));
    });
  }, [dispatch]);

  const reloadFavoriteMovies = useCallback(() => {
    storage.getFavorites().then(list => {
      dispatch(loadFavorites(list));
    });
  }, [dispatch]);

  const removeFavorite = useCallback(
    id => {
      storage.removeFavorite(id).then(updatedList => {
        dispatch(loadFavorites(updatedList));
      });
    },
    [dispatch],
  );

  return {
    loading,
    moviesFavorite,
    refreshing: false,
    reloadFavoriteMovies,
    loadMoreFavoriteMovies: () => {},
    removeFavorite,
  };
}
