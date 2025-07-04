const ReduxConstants = {
  actions: {
    fetchPopular: 'movies/fetchPopular',
    fetchSimilar: 'movies/fetchSimilar',
    applyFilters: 'filters/apply',
    fetchSearchResults: 'search/fetchResults',
  },
  Slices: {
    movies: 'movies',
    favorites: 'favorites',
    filters: 'filters',
    search: 'search',
  },
};

export default ReduxConstants;
