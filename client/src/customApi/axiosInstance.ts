import axios from 'axios';
import store from '../redux/store';
import { signOut } from '../redux/thunks/authThunks';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_API,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: any) => {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized: Token has expired or is invalid');
      store.dispatch(signOut());
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
