import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserProfile {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  birthday: string;
  gender: string;
}

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  userProfile: UserProfile | null;
}

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
    logout(state) {
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      state.userProfile = null;
      localStorage.removeItem('auth');
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout } =
  authSlice.actions;
export default authSlice.reducer;
