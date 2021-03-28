/*
 *
 * ToDoApp reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, ADD_TASK } from './constants';

export const initialState = { tasks: [] };

/* eslint-disable default-case, no-param-reassign */
const toDoAppReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case ADD_TASK:
        draft.tasks = [...state.tasks, action.data];
        break;
    }
  });

export default toDoAppReducer;
