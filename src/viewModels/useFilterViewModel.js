import {useEffect, useCallback, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {moviesPopular} from '../data/DataManager';
import {setSortBy, setGenre, applyFilters} from '../redux/filterSlice';
import Strings from '../utils/constants/Strings';

export function useFilterViewModel() {
  const dispatch = useDispatch();
  const {sortBy, genre, results, loading} = useSelector(s => s.filters);

  const availableGenres = useMemo(() => {
    const map = {};
    moviesPopular.forEach(m =>
      m.genres.forEach(g => {
        map[g.id] = g.name;
      }),
    );
    return [
      {id: 0, name: Strings.radioButtons.label.all},
      ...Object.entries(map).map(([id, name]) => ({
        id: Number(id),
        name,
      })),
    ];
  }, []);

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
