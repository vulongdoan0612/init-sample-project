import { getListCreateJob } from '@/services/job';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


interface IState {
  loadingCreateJob: any;
  listCreateJob: any;
  error: any;
}

const initialState: IState = {
  loadingCreateJob: false,
  listCreateJob: {},
  error: '',
};

const slice = createSlice({
  name: 'listCreateJob',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchListCreateJob.pending, (state) => {
      state.loadingCreateJob = true;
    });
    builder.addCase(fetchListCreateJob.fulfilled, (state, action) => {
      state.loadingCreateJob = false;
      state.listCreateJob = action.payload;

      state.error = '';
    });
    builder.addCase(fetchListCreateJob.rejected, (state, action) => {
      state.loadingCreateJob = false;
      state.listCreateJob = {};
      state.error = action?.error?.message || 'Error while processing.';
    });
  },
});

export default slice.reducer;

export const fetchListCreateJob = createAsyncThunk('fetch/jobs', async (arg: any) => {
  const { token, pageSize, current, filter } = arg;

  const res = await getListCreateJob(token, pageSize, current, filter);
  return res?.data;
});
