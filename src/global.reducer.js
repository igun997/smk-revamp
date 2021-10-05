import produce from 'immer';
import { POST_SIGN_IN_SUCCESS } from 'containers/SignIn/signin.constants';
import { LOADING } from './global.constants';
import { getMe } from './containers/SignIn/signin.api';

const token = localStorage.getItem('token');
const userData = localStorage.getItem('user');
const userState = token ? { user: JSON.parse(userData) } : {};
export const initialState = {
  ...userState,
  loading:false
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case POST_SIGN_IN_SUCCESS:
        const newToken = action.payload.data.access_token;
        localStorage.setItem('token', newToken);
        getMe().then((r) => {
          localStorage.setItem('user', JSON.stringify(r.data));
          return r.data
        })

        draft = {
          ...state,
          user: null
        }
        break;
      case LOADING:
        draft = {
          ...state,
          loading: action.payload
        }
        break;
    }
    return draft
  });

export default appReducer;
