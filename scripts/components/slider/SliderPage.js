import React from 'react';
import SliderItem from './SliderItem';

export default class SliderPage extends React.Component {
  constructor() {
    super();
    this.state = {
      position: "none"
    }
  }

  render() {
    var itemState = null;
    var classes = {
      "slider-page" : true,
      "page-none" : this.props.isNone,
      "page-current" : this.props.isCurrent,
      "page-nexting" : this.props.isNexting,
      "page-preving" : this.props.isPreving,
      "page-next" : this.props.isNext,
      "page-prev" : this.props.isPrev
    };

    let classesStr = "col-sm-12";
    for (let key in classes) {
      if (classes[key]) {
        classesStr += (" " + key);
      }
    }

    if (this.props.isNext || this.props.isNexting) {
      itemState = "NEXT";
    }

    if (this.props.isPrev || this.props.isPreving) {
      itemState = "PREV";
    }

    if (this.props.isCurrent) {
      itemState = "CURRENT";
    }

    var items = this.props.items;
    var itemsList = items.map(function (item, index) {
      return <SliderItem item={item} key={index} itemState={itemState}/>
    });

    if (itemsList.length < 12) {
      var emptyItem = {
        photoimg: "/img/no-image-gray-ua.png",
        isEmptyItem: true
      }
      for (var i=itemsList.length; i<12; i++) {
        itemsList.push(<SliderItem item={emptyItem} key={i} itemState={itemState}/>)
      }
    }

    return (
      <div className={classesStr} id={this.props.id}>
        <div className="row">
          {itemsList}
        </div>
      </div>
    )
  }
}
