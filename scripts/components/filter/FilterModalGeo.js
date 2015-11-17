import React           from 'react';
import FilterItemsList from './FilterItemsList';
import Actions         from './../Actions'

export default class FilterModalGeo extends React.Component{
  itemClick(data) {
    if (data.is_path) {
      Actions.fetchGeo(data.name);
    } else {
      Actions.setParam("geo", data.seo_name);
      if (this.props.closeModal) {
        this.props.closeModal();
      }
    }
  }

  render() {
    var data = this.props.data;
    return (
      <div className="content" id="regions-list">
        <FilterItemsList onItemClick={this.itemClick} items={data.list} />
      </div>
    );
  }
}
