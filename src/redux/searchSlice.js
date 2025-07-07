import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import ReduxConstants from '../utils/constants/ReduxConstants';
import Strings from '../utils/constants/Strings';
import {API_KEY} from '../api/api';
import {SEARCH} from '../api/endpoints';

export const fetchSearchResults = createAsyncThunk(
  ReduxConstants.actions.fetchSearchResults,
  async query => {
    const res = await fetch(
      `${SEARCH}?api_key=${API_KEY}` +
        `&language=en-US&query=${encodeURIComponent(query)}` +
        `&page=1&include_adult=false`,
    );
    if (!res.ok) throw new Error(Strings.errors.searchFailed);
    const body = await res.json();
    return body.results;
  },
);

const searchSlice = createSlice({
  name: ReduxConstants.Slices.search,
  initialState: {query: Strings.texts.empty, results: [], loading: false},
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchSearchResults.pending, state => {
        state.loading = true;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(fetchSearchResults.rejected, state => {
        state.loading = false;
      });
  },
});

export const {setQuery} = searchSlice.actions;
export default searchSlice.reducer;
