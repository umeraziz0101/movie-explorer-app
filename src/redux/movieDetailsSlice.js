import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {API_KEY} from '../api/api';
import {DETAIL} from '../api/endpoints';
import ReduxConstants from '../utils/constants/ReduxConstants';
import Strings from '../utils/constants/Strings';

export const fetchMovie = createAsyncThunk(
  ReduxConstants.actions.fetchMovie,
  async id => {
    const url =
      `${DETAIL(id)}?api_key=${API_KEY}` +
      `&append_to_response=credits,recommendations`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(Strings.errors.failedToLoadMovie);
    return res.json();
  },
);

const movieDetailsSlice = createSlice({
  name: ReduxConstants.Slices.movie,
  initialState: {byId: {}, loading: {}, error: {}},
  extraReducers: builder => {
    builder
      .addCase(fetchMovie.pending, (s, a) => {
        s.loading[a.meta.arg] = true;
      })
      .addCase(fetchMovie.fulfilled, (s, a) => {
        s.loading[a.meta.arg] = false;
        s.byId[a.payload.id] = a.payload;
      })
      .addCase(fetchMovie.rejected, (s, a) => {
        s.loading[a.meta.arg] = false;
        s.error[a.meta.arg] = a.error.message;
      });
  },
});
export default movieDetailsSlice.reducer;
