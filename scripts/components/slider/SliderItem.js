import React   from 'react';
import Actions from './../Actions';
import {Link}  from 'react-router';
//import DetailsStore from './../details/detailsStore';

export default class SliderItem extends React.Component {

  setItem() {
    if (
      (this.props.itemState === "NEXT") ||
      (this.props.itemState === "NEXTING")
    ){
      Actions.sliderPrev();
    }

    if (
      (this.props.itemState === "PREV") ||
      (this.props.itemState === "PREVING")
    ) {
      Actions.sliderNext();
    }

    if (this.props.item.isEmptyItem === true) {
      return true;
    }

    if (this.props.itemState === "CURRENT") {
      //DetailsStore.fetchDetails(this.props.item.post_id);
    }
  }

  render() {
    var item = this.props.item;

    var photo = "http://saleon.info/media/" + item.photoimg;
    var seo_name = item["seo_name"];

    if (this.props.item.isEmptyItem === true) {
      photo = "http://saleon.info" + item.photoimg;
      seo_name = "#";
    }

    return (
      <div className="col-xs-6 col-sm-3 col-lg-3">
        <div className="slider-item" onClick={this.setItem.bind(this)}>
          <Link className="img-wrapper" to={"/show/" + seo_name}>
            <img src={photo} className="img-polaroid" />
          </Link>
        </div>
      </div>
    )
  }
}
