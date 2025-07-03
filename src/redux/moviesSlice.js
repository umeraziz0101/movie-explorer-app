import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import ReduxConstants from '../utils/constants/ReduxConstants';
import {API_KEY, BASE_URL} from '../api/api';
import {POPULAR, TRENDING, DISCOVER} from '../api/endpoints';
import Strings from '../utils/constants/Strings';

const buildRange = monthsBack => {
  const today = new Date();
  const end = new Date(today.getFullYear(), today.getMonth(), 0);
  const start = new Date(end.getFullYear(), end.getMonth() - monthsBack + 1, 1);
  const toISO = d => d.toISOString().slice(0, 10);
  return {gte: toISO(start), lte: toISO(end)};
};
const lastMonth = buildRange(1);
const lastSix = buildRange(6);

export const fetchTrendingToday = createAsyncThunk(
  ReduxConstants.actions.fetchTrendingToday,
  async () => {
    const res = await fetch(`${TRENDING}?api_key=${API_KEY}`);
    if (!res.ok) throw new Error(Strings.errors.failedToLoadTrending);
    const json = await res.json();
    return json.results;
  },
);

export const fetchPopular = createAsyncThunk(
  ReduxConstants.actions.fetchPopular,
  async (page = 1) => {
    const res = await fetch(`${POPULAR}?page=${page}&api_key=${API_KEY}`);

    if (!res.ok) throw new Error(Strings.errors.failedToLoadPopular);
    const json = await res.json();
    return {results: json.results, page};
  },
);

export const fetchLastMonth = createAsyncThunk(
  ReduxConstants.actions.fetchLastMonth,
  async () => {
    const {gte, lte} = lastMonth;
    const url =
      `${DISCOVER}?primary_release_date.gte=${gte}` +
      `&primary_release_date.lte=${lte}` +
      `&sort_by=popularity.desc&api_key=${API_KEY}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(Strings.errors.failedLastMonthList);
    return (await res.json()).results;
  },
);

export const fetchLastSixMonths = createAsyncThunk(
  ReduxConstants.actions.fetchLastSixMonths,
  async () => {
    const {gte, lte} = lastSix;
    const url =
      `${DISCOVER}?primary_release_date.gte=${gte}` +
      `&primary_release_date.lte=${lte}` +
      `&sort_by=popularity.desc&api_key=${API_KEY}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(Strings.errors.failedSixMonthList);
    return (await res.json()).results;
  },
);
const moviesSlice = createSlice({
  name: ReduxConstants.Slices.movies,
  initialState: {
    trendingToday: [],
    popular: [],
    lastMonth: [],
    lastSixMonths: [],
    page: 1,
    loadingTrending: false,
    loadingPopular: false,
    loadingLastMonth: false,
    loadingLastSix: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTrendingToday.pending, state => {
        state.loadingTrending = true;
      })
      .addCase(fetchTrendingToday.fulfilled, (state, {payload}) => {
        state.loadingTrending = false;
        state.trendingToday = payload;
      })
      .addCase(fetchTrendingToday.rejected, (state, action) => {
        state.loadingTrending = false;
        state.error = action.error.message;
      });

    builder
      .addCase(fetchPopular.pending, state => {
        state.loadingPopular = true;
      })
      .addCase(fetchPopular.fulfilled, (state, {payload}) => {
        state.loadingPopular = false;
        if (payload.page === 1) state.popular = payload.results;
        else state.popular.push(...payload.results);
        state.page = payload.page + 1;
      })
      .addCase(fetchPopular.rejected, (state, action) => {
        state.loadingPopular = false;
        state.error = action.error.message;
      });

    builder
      .addCase(fetchLastMonth.pending, s => {
        s.loadingLastMonth = true;
      })
      .addCase(fetchLastMonth.fulfilled, (s, {payload}) => {
        s.loadingLastMonth = false;
        s.lastMonth = payload;
      })
      .addCase(fetchLastMonth.rejected, (s, a) => {
        s.loadingLastMonth = false;
        s.error = a.error.message;
      });

    builder
      .addCase(fetchLastSixMonths.pending, s => {
        s.loadingLastSix = true;
      })
      .addCase(fetchLastSixMonths.fulfilled, (s, {payload}) => {
        s.loadingLastSix = false;
        s.lastSixMonths = payload;
      })
      .addCase(fetchLastSixMonths.rejected, (s, a) => {
        s.loadingLastSix = false;
        s.error = a.error.message;
      });
  },
});

export default moviesSlice.reducer;
