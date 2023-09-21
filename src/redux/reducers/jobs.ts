import { getAllJob } from '@/services/job';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


interface IState {
  loading: any;
  jobs: any;
  error: any;
}
interface IFetchJob {
  pageSize: number; current: number; filter: string; type: string
}
const initialState: IState = {
  loading: false,
  jobs: {},
  error: '',
};

const slice = createSlice({
  name: 'job',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchListJobs.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchListJobs.fulfilled, (state, action) => {
      state.loading = false;
      state.jobs = action.payload;

      state.error = '';
    });
    builder.addCase(fetchListJobs.rejected, (state, action) => {
      state.loading = false;
      state.jobs = {};
      state.error = action?.error?.message || 'Error while processing.';
    });
  },
});

export default slice.reducer;

export const fetchListJobs = createAsyncThunk('fetch/jobs', async (arg: IFetchJob) => {
  const { pageSize, current, filter, type } = arg;
  const res = await getAllJob(pageSize, current, filter, type);
  return res?.data;
});
