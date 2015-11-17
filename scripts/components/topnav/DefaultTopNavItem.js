import React   from 'react';
import Reflux  from 'reflux';
import Actions from './../Actions';
import {Link}  from 'react-router';

export default class DefaultTopNavItem extends React.Component{

  render() {
    var alias = this.props.item.alias;
    if (this.props.item.alias == "Partner") {
      alias = "/partner/index";
    }

    let mapping = {
      GeoFilter: "geo",
      CategoriesFilter: "categories",
      BrandsFilter: "brands"
    }

    var classes = {
      "btn-active": this.props.isActive,
      "btn-current": this.props.isCurrent
    };

    let classesStr = "btn";
    for (let key in classes) {
      if (classes[key]) {
        classesStr += (" " + key);
      }
    }

    return (
      <div className="col-sm-1">
        <Link to={"/filter/" + mapping[this.props.item.alias]} className={classesStr} data-toggle="tooltip" title={this.props.item.title} data-original-title={this.props.item.title}>
          <i className={ "fa " + this.props.item.itemClass }></i>
        </Link>
      </div>
    )
  }
};