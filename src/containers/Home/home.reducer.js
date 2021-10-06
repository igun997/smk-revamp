import produce from 'immer';
import { GET_STATISTIC } from './home.constants';

export const initialState = {
  statistic: {
    last: 0,
    current: 0,
  },
};

/* eslint-disable default-case, no-param-reassign */
const homeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_STATISTIC:
        console.log('s', action.payload);
        draft = {
          ...state,
          statistic: {
            ...state.statistic,
            last: action.payload.last,
            current: action.payload.current,
          },
        };
        break;
    }
    return draft;
  });

export default homeReducer;
