import { getUserAppliedJob } from '@/services/job';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


interface IState {
  loading: any;
  userAppliedJob: any;
  error: any;
}

const initialState: IState = {
  loading: false,
  userAppliedJob: {},
  error: '',
};

const slice = createSlice({
  name: 'userAppliedJob',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchListUserAppliedJob.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchListUserAppliedJob.fulfilled, (state, action) => {
      state.loading = false;
      state.userAppliedJob = action.payload;

      state.error = '';
    });
    builder.addCase(fetchListUserAppliedJob.rejected, (state, action) => {
      state.loading = false;
      state.userAppliedJob = {};
      state.error = action?.error?.message || 'Error while processing.';
    });
  },
});

export default slice.reducer;

export const fetchListUserAppliedJob = createAsyncThunk('fetch/jobs', async (args: { accessToken: string; id: any }) => {
  const { accessToken, id } = args;
  const res = await getUserAppliedJob(accessToken, id);
  return res?.data;
});
