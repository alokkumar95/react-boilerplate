/**
 *
 * ToDoApp
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectToDoApp from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { ADD_TASK } from './constants';

export function ToDoApp(props) {
  useInjectReducer({ key: 'toDoApp', reducer });
  useInjectSaga({ key: 'toDoApp', saga });
  const [state, setState] = React.useState('');

  const tasks = props.toDoApp.tasks || [];

  React.useEffect(() => {
    console.log('Props==', props);
  }, [props]);

  return (
    <div>
      <h1>List of task</h1>
      <input
        className="form-control"
        type="text"
        value={state}
        onChange={event => {
          const { value } = event.target;
          setState(value);
        }}
      />
      <button
        type="button"
        onClick={() => {
          props.dispatch({ type: ADD_TASK, data: state });
          setState('');
        }}
      >
        Add Task
      </button>
      <ul>
        {tasks.map(data => (
          <li>{data}</li>
        ))}
      </ul>
    </div>
  );
}

ToDoApp.propTypes = {
  dispatch: PropTypes.func.isRequired,
  toDoApp: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  toDoApp: makeSelectToDoApp(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ToDoApp);
