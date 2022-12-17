import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  address: "",
};

const slice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setAddress: (state, action) => ({
      ...state,
      address: action.payload,
    }),
  },
});

export const { setAddress } = slice.actions;

export default slice.reducer;
