import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutSuccess,
  logoutFailure,
} from '../slices/authSlice';
import axiosInstance from '../../CustomApi/axiosInstance';

// Define the login thunk
export const login = createAsyncThunk(
  'auth/login',
  async (
    { email, password }: { email: string; password: string },
    { dispatch }
  ) => {
    dispatch(loginRequest());
    try {
      const response = await axiosInstance.post('/users/login', {
        email,
        password,
      });
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
      await axiosInstance.post('/users/logout');
      dispatch(logoutSuccess());
    } catch (error) {
      console.error('Error during logout', error);
      dispatch(logoutFailure('Logout failed. Please try again.'));
    }
  }
);
