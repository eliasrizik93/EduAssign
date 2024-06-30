import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
} from '../slices/authSlice';

// Define the login thunk
export const login = createAsyncThunk(
  'auth/login',
  async (
    { email, password }: { email: string; password: string },
    { dispatch }
  ) => {
    dispatch(loginRequest());
    try {
      const response = await axios.post(
        'http://localhost:3002/users/login',
        { email, password },
        { withCredentials: true }
      );
      dispatch(loginSuccess(response.data.profile));
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || 'Login failed';
      dispatch(loginFailure(errorMessage));
    }
  }
);

export const signOut = createAsyncThunk(
  'auth/signOut',
  async (_, { dispatch }) => {
    try {
      await axios.post(
        'http://localhost:3002/users/logout',
        {},
        { withCredentials: true }
      );
    } catch (error) {
      console.error('Error during logout', error);
    }
    dispatch(logout());
  }
);
