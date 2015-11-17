import React from 'react';
import Details from './../components/details/Details';

export default class DetailsPage extends React.Component {
  render() {
    return (
      <Details id={this.props.params.id}/>
    );
  }

}
