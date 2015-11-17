import React   from 'react';
import Actions from './../Actions';
import {Link}  from 'react-router';

export default class XsTopNavItem extends React.Component {
  setItem() {
    Actions.setNavTab(this.props.itemAlias);
    if (this.props.onSet) {
      this.props.onSet();
    }
  }

  render() {
    let classNames = 'fa' + ' ' + this.props.item.itemClass;
    let link = this.props.itemAlias;
    if (this.props.item.alias === 'Partner') {
      return (<li>
        <a href='/partner/index'>
          <i className={classNames}></i>&nbsp;&nbsp;{this.props.item.title}
        </a></li>
      );
    }

    switch (link) {
      case "geo":
      case 'categories':
      case 'brands':
        link = "filter/" + link;
        break;
    }

    return (
      <li>
        <Link to={"/" + link} onClick={this.setItem.bind(this)}>
          <i className={classNames}></i>
          &nbsp;&nbsp;{this.props.item.title}
        </Link>
      </li>
    );
  }
}
