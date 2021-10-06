import { createSelector } from 'reselect';
import { initialState } from './global.reducer';

const selectGlobal = state => state.global || initialState;
const selectRouter = state => state.router;

const makeSelectUser = () => createSelector(selectGlobal, globalState => globalState.user);
const makeSelectUserId = () => createSelector(selectGlobal, globalState => globalState.user.id);
const makeSelectUserPermissions = () => createSelector(selectGlobal, globalState => globalState.user.permissions);
const getLoadingState = () => createSelector(selectGlobal, globalState => globalState.loading);
const getCollapseMenu = () => createSelector(selectGlobal, globalState => globalState.collapse);
const getCollapseSider = () => createSelector(selectGlobal, globalState => globalState.collapse_sider);

export {
  selectGlobal,
  selectRouter,
  getCollapseSider,
  makeSelectUser,
  makeSelectUserId,
  makeSelectUserPermissions,
  getLoadingState,
  getCollapseMenu,
};
