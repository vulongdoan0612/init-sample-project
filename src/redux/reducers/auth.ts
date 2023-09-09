import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/internal";

interface IState {
  isAuthenticated: boolean;
  account?: any;
}

const initialState: IState = {
  isAuthenticated: false,
  account: {}
};

const slicer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthenticate: (
      state: WritableDraft<IState>,
      action: PayloadAction<{
        isAuthenticated: boolean;
        account: any;
      }>
    ) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.account = action.payload.account;
    },
  },
});

export const { setAuthenticate } = slicer.actions;

export default slicer.reducer;
