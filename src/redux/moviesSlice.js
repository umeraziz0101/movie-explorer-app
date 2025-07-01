import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {moviesPopular, moviesRelated, popular_today} from '../data/DataManager';
import ReduxConstants from '../utils/constants/ReduxConstants';
import Strings from '../utils/constants/Strings';

const pageSize = 10;

export const fetchPopular = createAsyncThunk(
  ReduxConstants.actions.fetchPopular,
  async (page = 1) => {
    const start = (page - 1) * pageSize;
    const data = moviesPopular.slice(start, start + pageSize);
    return {data, page};
  },
);

export const fetchSimilar = createAsyncThunk(
  ReduxConstants.actions.fetchSimilar,
  async movieId => {
    const movie = moviesPopular.find(m => m.id === movieId);

    const raw = moviesRelated.filter(m =>
      m.genre_ids.some(g => movie.genre_ids.includes(g)),
    );

    const similar = raw.map(m => ({
      ...m,
      overview: Array.isArray(m.overview)
        ? m.overview.join(Strings.texts.emptySpace)
        : m.overview,
    }));
    return {movieId, similar};
  },
);

const moviesSlice = createSlice({
  name: ReduxConstants.Slices.movies,
  initialState: {
    popular: [],
    page: 1,
    loading: false,
    error: null,
    similarById: {},
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPopular.pending, state => {
        state.loading = true;
      })
      .addCase(fetchPopular.fulfilled, (state, {payload}) => {
        state.loading = false;
        if (payload.page === 1) state.popular = payload.data;
        else state.popular.push(...payload.data);
        state.page = payload.page + 1;
      })
      .addCase(fetchPopular.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchSimilar.fulfilled, (state, {payload}) => {
        state.similarById[payload.movieId] = payload.similar;
      });
  },
});

export default moviesSlice.reducer;
