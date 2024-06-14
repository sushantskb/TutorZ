import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = "http://localhost:8000";

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
      state.error = null;
    },
    setUser(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoading = false;
    },
    setError(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoading = false;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.error = null;
    },
  },
});

export const { startLoading, setUser, setError, logout } = authSlice.actions;

export default authSlice.reducer;

// signup
export const signup = (userData) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const response = await axios.post(`${API_URL}/api/auth/signup`, userData);
    dispatch(setUser(response.data));
  } catch (error) {
    dispatch(setError(error.response.data.message));
  }
};

export const login = (userData) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const response = await axios.post(`{API_URL}/api/auth/login`, userData);
    dispatch(setUser(response.data));
  } catch (error) {
    dispatch(setError(error.response.data.message));
  }
};
