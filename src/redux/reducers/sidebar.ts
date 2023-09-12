import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/internal';

interface IState {
  sidebar: string | null;
}

const initialState: IState = {
  sidebar: 'citizenDash',
};

const slicer = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setKeySidebar: (state: WritableDraft<IState>, action: PayloadAction<string | null>) => {
      state.sidebar = action.payload;
    },
  },
});

export const { setKeySidebar } = slicer.actions;

export default slicer.reducer;
