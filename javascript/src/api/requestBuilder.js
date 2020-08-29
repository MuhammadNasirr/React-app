import axios from 'axios';
import { host } from '../config';
import store from '../store';
import { fetchLogout } from '../actions/auth';


const axiosInstance = axios.create({
  baseURL: host,
  //withCredentials: true,
});

export const defaultResponse = {
  status: 500,
  data: {
    error: 'server.error',
  },
};

export const formatError = (responseError) => {
  const response = responseError.response || defaultResponse;
  const errors = (response.data && (response.data.errors || [response.data.error])) || [];
  if (response.status === 401) {
    store.dispatch(fetchLogout()); //dispatch logout for each 401 Unauthorized
  }
  return {
    code: response.status,
    message: errors,
  };
};

axiosInstance.interceptors.response.use(
  response => {
    return response;
  }, error => {
    return Promise.reject(formatError(error))
  });

export default axiosInstance;

