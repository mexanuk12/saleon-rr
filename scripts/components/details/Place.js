import React from 'react';

export default class Place extends React.Component{

  render() {
    return (
      <div className="detail-map-marker">
        <div className="place-marker"><i className="fa fa-map-marker fa-2x"></i></div>
        <div className="place-address">
          {this.props.text}
        </div>
      </div>
    );
  }
}
