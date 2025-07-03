import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import ReduxConstants from '../utils/constants/ReduxConstants';
import Strings from '../utils/constants/Strings';

import {API_KEY} from '../api/api';
import {DISCOVER, GENRE_LIST} from '../api/endpoints';

export const fetchGenres = createAsyncThunk(
  ReduxConstants.actions.fetchGenres,
  async () => {
    const res = await fetch(`${GENRE_LIST}?api_key=${API_KEY}&language=en-US`);
    if (!res.ok) throw new Error(Strings.errors.failedToLoadGenres);
    return (await res.json()).genres;
  },
);

export const applyFilters = createAsyncThunk(
  ReduxConstants.actions.applyFilters,

  async ({sortBy, genre}) => {
    const sortParam =
      sortBy === Strings.radioButtons.value.recent
        ? 'primary_release_date.desc'
        : 'popularity.desc';

    const qs = new URLSearchParams({
      api_key: API_KEY,
      language: 'en-US',
      sort_by: sortParam,
      page: '1',
      include_adult: 'false',
    });
    if (genre && genre !== 0) qs.append('with_genres', genre);

    const res = await fetch(`${DISCOVER}?${qs.toString()}`);
    if (!res.ok) throw new Error(Strings.errors.failedToLoadMovies);
    return (await res.json()).results;
  },
);

const filterSlice = createSlice({
  name: ReduxConstants.Slices.filters,
  initialState: {
    sortBy: Strings.radioButtons.value.relevant,
    genre: 0,
    results: [],
    loading: false,
    genresList: [],
    loading: false,
    loadingGenres: false,
  },
  reducers: {
    setSortBy(state, {payload}) {
      state.sortBy = payload;
    },
    setGenre(state, {payload}) {
      state.genre = payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchGenres.pending, s => {
        s.loadingGenres = true;
      })
      .addCase(fetchGenres.fulfilled, (s, {payload}) => {
        s.loadingGenres = false;
        s.genresList = payload;
      })
      .addCase(fetchGenres.rejected, s => {
        s.loadingGenres = false;
      });
    builder
      .addCase(applyFilters.pending, state => {})
      .addCase(applyFilters.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.results = payload;
      })
      .addCase(applyFilters.rejected, state => {
        state.loading = false;
      });
  },
});

export const {setSortBy, setGenre} = filterSlice.actions;
export default filterSlice.reducer;
