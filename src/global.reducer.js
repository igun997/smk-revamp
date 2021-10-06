import produce from 'immer';
import { POST_SIGN_IN_SUCCESS } from 'containers/SignIn/signin.constants';
import { ADD_INFO, ALERT_INFO, CLEAR_USER, COLLAPSE, COLLAPSE_SIDER, LOADING } from './global.constants';

const token = localStorage.getItem('token');
const userData = localStorage.getItem('user');
const userState = token ? { user: JSON.parse(userData) } : {};
export const initialState = {
  ...userState,
  loading: false,
  collapse: false,
  collapse_sider: false,
  alert: {
    display: false,
    msg: '',
    type: 'success',
  },
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case POST_SIGN_IN_SUCCESS:
        const newToken = action.payload.data.access_token;
        localStorage.setItem('token', newToken);

        draft = {
          ...state,
          user: null,
        };
        break;
      case LOADING:
        draft = {
          ...state,
          loading: action.payload,
        };
        break;
      case COLLAPSE:
        draft = {
          ...state,
          collapse: action.payload,
        };
        break;
      case COLLAPSE_SIDER:
        draft = {
          ...state,
          collapse_sider: action.payload,
        };
        break;
      case ADD_INFO:
        localStorage.setItem('user', JSON.stringify(action.payload.data));
        draft = {
          ...state,
          user: action.payload.data,
        };
        break;
      case CLEAR_USER:
        draft = {
          ...state,
          user: null,
        };
        break;
      case ALERT_INFO:
        draft = {
          ...state,
          alert: {
            ...action.payload,
          },
        };
        break;
    }
    return draft;
  });

export default appReducer;
