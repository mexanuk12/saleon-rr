import React from 'react';
import Filters from './../components/filter/Filters';

export default class FilterPage extends React.Component {
  render() {
    return (
      <Filters id={this.props.params.filterId} />
    );
  }

}
