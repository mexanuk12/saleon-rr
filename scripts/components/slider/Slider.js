import React from 'react';
import Reflux from 'reflux';

import Actions from '../Actions';
import SliderPage from './SliderPage';
import SliderStore from './SliderStore';

export const PAGE_CURRENT = "page-current";
export const PAGE_PREV = "page-prev";
export const PAGE_NEXT = "page-next";
export const PAGE_PREVING = "page-preving";
export const PAGE_NEXTING = "page-nexting";
export const PAGE_NONE = "page-none";

export default class Slider extends React.Component {
  constructor() {
    super();
    this.currentPageNo = 1;
    this.state = {
      sliderStore: null
    }
  }

  componentDidMount() {
    this.unsubscribe = SliderStore.listen(this.onSliderChange.bind(this));
    Actions.getSliderData();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onSliderChange(state) {
    this.setState({ "sliderStore": state });
  }
  
  getPosition(index) {
    for (var key in this.state.pagesMap) {
      if (this.state.pagesMap[key] === index) {
        return key;
      }
    }
    return "none";
  }

  gotoNext() {
    Actions.sliderNext();
  }

  gotoPrev() {
    Actions.sliderPrev();
  }

  _renderLoading() {
  	return (
      <div className="row">
        <br/>
        <br/>
        <br/>
        <div className="col-xs-8 col-xs-offset-2 well">
          <center>
            <h3>Триває завантаження даних...</h3>
            <p>Зачекайте будь-ласка</p>
          </center>
        </div>
      </div>
    );
  }

  _renderFallOut() {
    return (
      <div className="row">
        <br/>
        <br/>
        <br/>
        <div className="col-xs-8 col-xs-offset-2 well">
          <center>
            <h2>Упс, нічого немає</h2>
            <p>Спробуйте змінити параметри фільтрів</p>
          </center>
        </div>
      </div>
    );
  }

  _renderSliderPage (item, index) {
    var isNone = false;
    var isCurrent = false;
    var isNext = false;
    var isPrev = false;
    var isNexting = false;
    var isPreving = false;

    switch (item.state) {
      case PAGE_CURRENT:
        this.currentPageNo = index+1;
        isCurrent = true;
        break;

      case PAGE_NEXT:
        isNext = true;
        break;

      case PAGE_NEXTING:
        isNexting = true;
        break;

      case PAGE_PREV:
        isPrev = true;
        break;

      case PAGE_PREVING:
        isPreving = true;
        break;

      default :
        isNone = true;
    }

    return (
      <SliderPage
        isNone={isNone}
        isCurrent={isCurrent}
        isNexting={isNexting}
        isPreving={isPreving}
        isNext={isNext}
        isPrev={isPrev}
        items={item.data}
        key={index}
      >
      </SliderPage>
    );
  };

  render() {
    let data = this.state.sliderStore;

    if (data == null) {
      return this._renderLoading();
    }

    if (!data.length) {
      return this._renderFallOut();
    }

    let pagesContent = data.map(this._renderSliderPage.bind(this));

    return (
      <div className="slider container-fluid">
        <div className="row">
        { pagesContent }
        </div>
        <div className="counter-row">
          <button className="btn btn-large" onClick={Actions.sliderPrev}><i className="fa fa-caret-left"></i></button>
          {this.currentPageNo + '/' + pagesContent.length}
          <button className="btn btn-large" onClick={Actions.sliderNext}><i className="fa fa-caret-right"></i></button>
        </div>
      </div>
    )
  }
}