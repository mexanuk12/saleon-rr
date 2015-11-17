import React from 'react';

export default class FilterItem extends React.Component{
  render() {
    return (
      <div className="col-sm-4 col-md-3 col-lg-3" onClick={this.props.onClick}>
        <div className="filter-item" data-id={this.props.item.seo_name} data-region-seo-name={this.props.item.seo_name} data-cat-seo-name={this.props.item.seo_name}>
          <div className="title">{this.props.item.value ? this.props.item.value : this.props.item.name}</div>
          <span className="counter">{this.props.item.count}</span>
        </div>
      </div>
    )
  }
}
