import {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import debounce from 'lodash.debounce';
import {fetchSearchResults, setQuery} from '../redux/searchSlice';
import Constants from '../utils/constants/Constants';

export function useSearchViewModel() {
  const dispatch = useDispatch();
  const {query, results, loading} = useSelector(state => state.search);

  const debouncedSearch = useCallback(
    debounce(q => {
      dispatch(fetchSearchResults(q));
    }, Constants.searchDuration),
    [dispatch],
  );

  const onChangeQuery = useCallback(
    text => {
      dispatch(setQuery(text));
      debouncedSearch(text);
    },
    [dispatch, debouncedSearch],
  );

  useEffect(() => {
    dispatch(fetchSearchResults(query));
  }, [dispatch]);

  return {query, results, loading, onChangeQuery};
}
