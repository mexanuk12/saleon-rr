import React       from 'react';
import Reflux      from 'reflux';
import Actions from './../Actions';


export default class XsTopNavItem extends React.Component {
  setItem() {
    Actions.setNavTab(this.props.itemAlias);
    if (this.props.onSet) {
      this.props.onSet();
    }
  }

  render() {
    let classNames = "fa" + " " + this.props.item.itemClass;
    let alias = "#" + this.props.itemAlias;
    if (this.props.item.alias == "Partner") {
      alias = "/partner/index";
    }

    return (
      <li>
        <a href={alias} onClick={this.setItem.bind(this)}>
          <i className={classNames}></i>
        &nbsp;&nbsp;{this.props.item.title}</a>
      </li>
    )
  }
};
