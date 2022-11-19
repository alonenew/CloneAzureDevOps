import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { BASE_URL } from '../../Const';

let authToken = localStorage.getItem('token') ? localStorage.getItem('token') : null;

const initialState = {
  name: null,
  token: authToken
}

export const registerAsync = createAsyncThunk(
  "auth/register",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(BASE_URL + 'users/register', data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const loginAsync = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(BASE_URL + 'users/login', data)
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const reLoginAsync = createAsyncThunk(
  "auth/relogin",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(BASE_URL + 'users/relogin?id=' + data)
      return response.data.data.name;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, actions) => {
      state.token = actions.payload.token;
      state.name = actions.payload.name;
    },
    logoutUser: (state) => {
      localStorage.clear();
      state.token = null;
      state.name = null;
    },
    name: (state, actions) => {
      state.name = actions.payload;
    },
  }
})


export const selectName = (state) => state.auth.name
export const selectToken = (state) => state.auth.token
export const { login, logoutUser, name } = authSlice.actions

export default authSlice.reducer