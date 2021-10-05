import produce from 'immer';
import jwtDecode from 'jwt-decode';
import { POST_SIGN_IN_SUCCESS } from 'containers/SignIn/signin.constants';
import { LOADING } from './global.constants';

const token = localStorage.getItem('token');
const userState = token ? { user: jwtDecode(token) } : {};
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

        draft = {
          ...state,
          user: jwtDecode(newToken)
        }
        break;
      case LOADING:
        console.log("Loading",action);
        draft = {
          ...state,
          loading: action.payload
        }
        break;
    }
    return draft
  });

export default appReducer;
