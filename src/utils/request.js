import axios from 'axios';
import { message } from 'antd';
import { store } from '../index';
import { onLoading } from '../global.actions';
const {dispatch} = store
const instance = axios.create();
instance.defaults.baseURL = process.env.REACT_APP_BASE_URL;

instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.common.Authorization = `Bearer ${token}`; // eslint-disable-line no-param-reassign
    }
    dispatch(onLoading(true))
    return config;
  },
  error => Promise.reject(error),
);
instance.interceptors.response.use(
  response => {
    dispatch(onLoading(false))
    return response;
  },
  error => {
    dispatch(onLoading(false))
    message.error(`(${error.response.status}) ${error.response.data.message ?? error.response.data.error}`);
    return Promise.reject(error);
  },
);

export default instance;
