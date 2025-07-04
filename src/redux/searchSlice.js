import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {moviesPopular} from '../data/DataManager';
import ReduxConstants from '../utils/constants/ReduxConstants';
import Strings from '../utils/constants/Strings';

export const fetchSearchResults = createAsyncThunk(
  ReduxConstants.actions.fetchSearchResults,
  async query => {
    const q = query.toLowerCase();
    const filtered = moviesPopular.filter(m =>
      m.title.toLowerCase().includes(q),
    );
    return filtered;
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
