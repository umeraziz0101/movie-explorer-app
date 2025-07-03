import {useEffect, useCallback, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  setSortBy,
  setGenre,
  applyFilters,
  fetchGenres,
} from '../redux/filterSlice';
import Strings from '../utils/constants/Strings';

export function useFilterViewModel() {
  const dispatch = useDispatch();
  const {sortBy, genre, results, loading, genresList} = useSelector(
    s => s.filters,
  );

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  const availableGenres = useMemo(
    () => [{id: 0, name: Strings.radioButtons.label.all}, ...genresList],
    [genresList],
  );

  useEffect(() => {
    dispatch(applyFilters({sortBy, genre}));
  }, [dispatch]);

  const onSelectSort = useCallback(val => dispatch(setSortBy(val)), [dispatch]);
  const onSelectGenre = useCallback(val => dispatch(setGenre(val)), [dispatch]);
  const applySettings = useCallback(() => {
    dispatch(applyFilters({sortBy, genre}));
  }, [dispatch, sortBy, genre]);

  return {
    sortBy,
    genre,
    results,
    loading,
    onSelectSort,
    onSelectGenre,
    applySettings,
    availableGenres,
  };
}
