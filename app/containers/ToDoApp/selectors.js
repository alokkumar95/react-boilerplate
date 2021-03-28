import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the toDoApp state domain
 */

const selectToDoAppDomain = state => state.toDoApp || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ToDoApp
 */

const makeSelectToDoApp = () =>
  createSelector(
    selectToDoAppDomain,
    substate => substate,
  );

export default makeSelectToDoApp;
export { selectToDoAppDomain };
