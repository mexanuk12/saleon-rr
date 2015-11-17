import React      from 'react';
import FilterItem from './FilterItem';

export default class FilterItemsList extends React.Component{

  handleClick(id) {
    if (this.props.onItemClick) {
      this.props.onItemClick(id);
    }
  }

  render() {
    var self = this;
    var itemsBlock = this.props.items;

    if (itemsBlock === null) {
      return null;
    }

    var content = null;

    if (itemsBlock.length) {
      content = itemsBlock.map(function (item, i) {
        return <FilterItem key={i} item={item} onClick={self.handleClick.bind(self, item)} />
      });
    } else {
      content = (<div>No items</div>);
    }

    return (
      <div className="row">
        {content}
      </div>
    )
  }
}
