import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const commonSlice = createSlice({
  name: "common",
  initialState: {
    appError: "",
  },
  reducers: {
    updateAppError: (state, action: PayloadAction<string>) => {
      state.appError = action.payload;
    },
  },
});

export const { updateAppError } = commonSlice.actions;
export const commonReducer = commonSlice.reducer;
