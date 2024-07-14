import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserProfile = {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  birthday: string;
  gender: string;
};

type AuthState = {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  userProfile: UserProfile | null;
};

const initialState: AuthState = {
  isAuthenticated: false,
  loading: false,
  error: null,
  userProfile: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<UserProfile>) {
      state.loading = false;
      state.isAuthenticated = true;
      state.userProfile = action.payload;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    logoutRequest(state) {
      state.loading = true;
      state.error = null;
    },
    logoutSuccess(state) {
      state.loading = false;
      state.isAuthenticated = false;
      state.userProfile = null;
      localStorage.removeItem('auth'); // Clear any auth data in local storage
    },
    logoutFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
} = authSlice.actions;
export default authSlice.reducer;
