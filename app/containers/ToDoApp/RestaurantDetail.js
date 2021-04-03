import React from 'react';
import './noodle.css';

export function RestaurantDetail(props) {
  return (
    <div>
         <h1>Restaurant Detail</h1>
      <div className="card">
        <img
          src={props.location.state.img}
          alt="Avatar"
          style={{ width: '100%' }}
        />
        <div className="container">
          <h4>
            <b>{props.location.state.data.Brand}</b>
          </h4>
          <p>{props.location.state.data.Variety}</p>
          <p>{props.location.state.data.Style}</p>
          <p>{props.location.state.data.Country}</p>
          <p>{props.location.state.data.Stars}</p>
          <p>{props.location.state.data['Top Ten']}</p>
        </div>
      </div>
    </div>
  );
}
