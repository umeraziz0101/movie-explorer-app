import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {moviesPopular} from '../data/DataManager';
import ReduxConstants from '../utils/constants/ReduxConstants';
import Strings from '../utils/constants/Strings';
import Constants from '../utils/constants/Constants';

export const applyFilters = createAsyncThunk(
  ReduxConstants.actions.applyFilters,
  async ({sortBy, genre}) => {
    await new Promise(res => setTimeout(res, Constants.fetchTimeOut));
    let filtered = [...moviesPopular];

    if (genre !== 0) {
      filtered = filtered.filter(m => m.genres.some(g => g.id === genre));
    }

    switch (sortBy) {
      case Strings.radioButtons.value.popular:
        filtered.sort((a, b) => b.popularity - a.popularity);
        break;
      case Strings.radioButtons.value.recent:
        filtered.sort(
          (a, b) => new Date(b.release_date) - new Date(a.release_date),
        );
        break;
      case Strings.radioButtons.value.relevant:
      default:
        break;
    }

    return filtered;
  },
);

const filterSlice = createSlice({
  name: ReduxConstants.Slices.filters,
  initialState: {
    sortBy: Strings.radioButtons.value.relevant,
    genre: 0,
    results: [],
    loading: false,
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
      .addCase(applyFilters.pending, state => {
        state.loading = true;
      })
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
