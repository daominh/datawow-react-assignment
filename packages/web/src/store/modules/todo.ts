import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type TFilterTodo = "All" | "Done" | "Undone";

type TTodoCommon = {
  filter: TFilterTodo;
};

const initialState: TTodoCommon = {
  filter: "All",
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    updateFilter: (state, action: PayloadAction<TFilterTodo>) => {
      state.filter = action.payload;
    },
  },
});

export const { updateFilter } = todoSlice.actions;
export const todoReducer = todoSlice.reducer;
