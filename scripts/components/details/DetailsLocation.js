import React      from 'react';
import DetailsMap from './DetailsMap';

export default class DetailsLocation extends React.Component{
  render() {
    return (
      <div className="details-location details-block row">
        <DetailsMap location={this.props.location} addresses={this.props.addresses}/>
      </div>
    )
  }
}
