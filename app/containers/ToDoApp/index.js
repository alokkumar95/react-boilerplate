/* eslint-disable react/button-has-type */
/* eslint-disable func-names */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable object-shorthand */
/* eslint-disable react/prop-types */
/**
 *
 * ToDoApp
 *
 */

import React, { Suspense } from 'react';
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
import './noodle.css';
import { brands } from './constants';
// import {Restaurant} from './Restaurant';
const Restaurant = React.lazy(() => import('./Restaurant'));

export function ToDoApp(props) {
  useInjectReducer({ key: 'toDoApp', reducer });
  useInjectSaga({ key: 'toDoApp', saga });

  const [searchedbrands, setSearchedbrands] = React.useState([]);
  // const [state, setState] = React.useState('');

  // const tasks = props.toDoApp.tasks || [];

  const timer = {};
  const debounce = (callback, ms, id) => {
    if (timer[id]) {
      clearTimeout(timer[id]);
    }
    timer[id] = setTimeout(() => callback(), ms);
  };

  const searchFilter = value => {
    console.log(brands);
    const filteredbrands = (brands || []).filter(record => {
      const brand = record.Brand.toLowerCase();
      const val = value.toLowerCase();
      return brand.includes(val);
    });
    setSearchedbrands([...filteredbrands]);
  };
  const images = [
    'https://s3-ap-southeast-1.amazonaws.com/he-public-data/images135ea53.jpeg',
    'https://s3-ap-southeast-1.amazonaws.com/he-public-data/indexee3e8a8.jpeg',
    'https://s3-ap-southeast-1.amazonaws.com/he-public-data/garlic-noodles-61-700x6802c7f765.jpeg',
    'https://s3-ap-southeast-1.amazonaws.com/he-public-data/Hakka-Noodles-2-34755e38.jpeg',
    'https://s3-ap-southeast-1.amazonaws.com/he-public-data/1200px-Mama_instant_noodle_block625f483.jpeg',
    'https://s3-ap-southeast-1.amazonaws.com/he-public-data/20190530-ramen-noodles-vicky-wasik-76-1500x11257be7d5b.jpeg',
    'https://s3-ap-southeast-1.amazonaws.com/he-public-data/200702_Hand-Pulled-Noodles_55099856b5.jpeg',
  ];

  const brandsData = (searchedbrands.length > 0
    ? searchedbrands
    : brands || []
  ).map((data, id) => {
    const image = images[Math.floor(Math.random() * images.length)];
    return (
      <div
        className="card"
        onClick={() => {
          props.history.push({
            pathname: `/restaurant_detail/${id}`,
            state: { index: id, img: image, data: data },
          });
        }}
      >
        <img src={image} alt="Avatar" style={{ width: '100%' }} />
        <div className="container">
          <h4>
            <b>{data.Brand}</b>
          </h4>
          <p>{data.Variety}</p>
          <p>{data.Style}</p>
          <p>{data.Country}</p>
          <p>{data.Stars}</p>
          <p>{data['Top Ten']}</p>
        </div>
      </div>
    );
  });

  return (
    <div>
      <h1>Search Top Ramen Restaurant</h1>
      <div>
        <input
          type="text"
          onChange={event => {
            const { value } = event.target;
            debounce(() => searchFilter(value), 100, 'brandSearch');
          }}
        />
      </div>
      <h2>Ramen Restaurant</h2>
      {/* <div className="grid-container">{brandsData}</div> */}

      <Suspense fallback={<div>Loading...</div>}>
        <Restaurant
          searchedbrands={searchedbrands}
          brands={brands}
          prop={props}
        />
      </Suspense>
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
