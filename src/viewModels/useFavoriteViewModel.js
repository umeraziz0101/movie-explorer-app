import {useCallback, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import storage from '../services/storage';
import {loadFavorites, removeFavorite as rmFav} from '../redux/favoritesSlice';
import Strings from '../utils/constants/Strings';

export function useFavoriteViewModel() {
  const dispatch = useDispatch();
  const moviesFavorite = useSelector(state => state.favorites.items);
  const loading = useSelector(state => state.favorites.loading);

  useEffect(() => {
    (async () => {
      const list = await storage.getFavorites();
      dispatch(loadFavorites(list));
    })();
  }, [dispatch]);

  const reloadFavoriteMovies = useCallback(async () => {
    const list = await storage.getFavorites();
    dispatch(loadFavorites(list));
  }, [dispatch]);

  const removeFavorite = useCallback(
    async id => {
      dispatch(rmFav(id));

      try {
        await storage.removeFavorite(id);
      } catch (err) {
        console.warn(Strings.errors.errorRemovingFavorite, err);
      }
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
