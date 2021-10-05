import configureStore from '../utils/configureStore';
import history from '../utils/history';

const initialState = {};
export const store = configureStore(initialState, history);
