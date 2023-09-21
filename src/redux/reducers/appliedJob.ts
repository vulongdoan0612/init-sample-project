import { getApplied } from '@/services/job';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


interface IState {
  loading: any;
  applied: any;
  error: any;
}

const initialState: IState = {
  loading: false,
  applied: {},
  error: '',
};

const slice = createSlice({
  name: 'appliedJob',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchListAppliedJob.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchListAppliedJob.fulfilled, (state, action) => {
      state.loading = false;
      state.applied = action.payload;

      state.error = '';
    });
    builder.addCase(fetchListAppliedJob.rejected, (state, action) => {
      state.loading = false;
      state.applied = {};
      state.error = action?.error?.message || 'Error while processing.';
    });
  },
});

export default slice.reducer;

export const fetchListAppliedJob = createAsyncThunk('fetch/jobs', async (accessToken: any) => {
  const res = await getApplied(accessToken);
  return res?.data;
});
