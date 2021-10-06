import { ADD_INFO, CLEAR_USER, COLLAPSE, COLLAPSE_SIDER, LOADING } from './global.constants';

export const onLoading = payload => ({ type: LOADING, payload });
export const collapseMenu = payload => ({ type: COLLAPSE, payload });
export const collapsedSider = payload => ({ type: COLLAPSE_SIDER, payload });
export const addInfoUser = payload => ({ type: ADD_INFO, payload });
export const clearInfoUser = payload => ({ type: CLEAR_USER, payload });
