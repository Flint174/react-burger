import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  password: "",
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setName(state, { payload }) {
      state.name = payload;
    },
    setEmail(state, { payload }) {
      state.email = payload;
    },
    setPassword(state, { payload }) {
      state.password = payload;
    },
  },
});

export const { setName, setEmail, setPassword } = profileSlice.actions;

export const profileReducer = profileSlice.reducer;
