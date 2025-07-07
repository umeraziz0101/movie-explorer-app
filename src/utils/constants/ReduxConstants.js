const ReduxConstants = {
  actions: {
    fetchPopular: 'movies/fetchPopular',
    fetchMovie: 'movie/fetchMovie',
    fetchGenres: 'filters/fetchGenres',
    fetchSimilar: 'movies/fetchSimilar',
    applyFilters: 'filters/apply',
    fetchSearchResults: 'search/fetchResults',
    fetchTrendingToday: 'movies/fetchTrendingToday',
    fetchLastMonth: 'movies/fetchLastMonth',
    fetchLastSixMonths: 'movies/fetchLastSixMonths',
  },
  Slices: {
    movies: 'movies',
    movie: 'movie',
    favorites: 'favorites',
    filters: 'filters',
    search: 'search',
  },
};

export default ReduxConstants;
