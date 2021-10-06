import { createSelector } from 'reselect';
import { initialState } from './home.reducer';

const selectHomeDomain = state => state.home || initialState;

const getStatisticData = () => createSelector(selectHomeDomain, substate => substate.statistic);

export { getStatisticData };
