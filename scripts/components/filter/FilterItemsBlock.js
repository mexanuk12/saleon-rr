import React      from 'react';
import FilterItem from './FilterItem';

export default class FilterItemsBlock extends React.Component{

  render() {
    var itemsBlock = this.props.items;

    if (itemsBlock === null) {
      return null;
    }

    var content = null;

    if (itemsBlock.sub.length) {
      content = itemsBlock.sub.map(function (item, i) {
        return <FilterItem key={i} item={item} />
      });
    } else {
      content = (<div>No items</div>);
    }

    return (
      <div>
        <h2>{itemsBlock.name}</h2>
        <hr/>
        <div className="row">
        {content}
        </div>
      </div>
    )
  }
}
