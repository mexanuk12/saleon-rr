import React from 'react';

export default class DetailsDescription extends React.Component{
  render() {
    return (
      <div className="details-description details-block row">
        { this.props.description }
      </div>
    );
  }
}
