import { createSlice } from "@reduxjs/toolkit";

export interface appState {
  isOnline: boolean;
}

export const initialState: appState = {
  isOnline: true,
};

export const appSlice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {
    setOnline: (state, action) => {
      state.isOnline = action.payload;
    },
  },
});

export const { setOnline } = appSlice.actions;

export default appSlice.reducer;
