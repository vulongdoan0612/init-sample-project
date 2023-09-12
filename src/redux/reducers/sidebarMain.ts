import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/internal';

interface IState {
  isShow: boolean | string;
  isFocus: boolean;
}

const initialState: IState = {
  isShow: false,
  isFocus: false,
};

const slice = createSlice({
  name: 'checkDisplay',
  initialState,
  reducers: {
    setShowSidebar: (state: WritableDraft<IState>, action: PayloadAction<boolean | string>) => {
      state.isShow = action.payload;
    },
    setFocus: (state: WritableDraft<IState>, action: PayloadAction<boolean>) => {
      state.isFocus = action.payload;
    },
  },
});

export const { setShowSidebar, setFocus } = slice.actions;

export default slice.reducer;
