import {useState, useEffect, useCallback} from 'react';
import {fetchUserData, logoutUser} from '../services/firebaseAuth';
import {moviesPopular as initialMoviesFavorite} from '../data/DataManager';
import Constants from '../utils/constants/Constants';
import Strings from '../utils/constants/Strings';

export function useFavoriteViewModel() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [moviesFavorite, setMoviesFavorite] = useState([]);
  const [page, setPage] = useState(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const pageSize = 10;

  const fetchPage = useCallback((pageNum = 1) => {
    const start = (pageNum - 1) * pageSize;
    const end = start + pageSize;
    return initialMoviesFavorite.slice(start, end);
  }, []);

  useEffect(() => {
    const loadInitial = async () => {
      setLoading(true);

      const first = fetchPage(1);
      setMoviesFavorite(first);
      setPage(2);
      setLoading(false);
    };
    const timeout = setTimeout(loadInitial, Constants.fetchTimeOut);
    return () => clearTimeout(timeout);
  }, [fetchPage]);

  const reloadFavoriteMovies = useCallback(() => {
    setRefreshing(true);
    const first = fetchPage(1);
    setMoviesFavorite(first);
    setPage(2);
    setRefreshing(false);
  }, [fetchPage]);

  const loadMoreFavoriteMovies = useCallback(() => {
    if (isFetchingMore) return;
    setIsFetchingMore(true);
    const next = fetchPage(page);
    if (next.length) {
      setMoviesFavorite(prev => [...prev, ...next]);
      setPage(prev => prev + 1);
    }
    setIsFetchingMore(false);
  }, [fetchPage, page, isFetchingMore]);

  return {
    loading,
    moviesFavorite,
    refreshing,
    reloadFavoriteMovies,
    loadMoreFavoriteMovies,
  };
}
