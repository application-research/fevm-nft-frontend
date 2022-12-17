import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isNotificationsPopupOn: false,
  message: "",
  description: "",
};

const slice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    toggleNotification: (state, action) => ({
      ...state,
      isNotificationsPopupOn:
        action.payload.toggle || !state.isNotificationsPopupOn,
      message: action.payload.message,
    }),
  },
});

export const { toggleNotification } = slice.actions;
export default slice.reducer;
