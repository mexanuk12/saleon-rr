import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import DocumentTitle from 'react-document-title';

import Reflux from 'reflux';
import TopNav from './../components/topnav/TopNav';
import Slider from './../components/slider/Slider';
import Actions from './../components/Actions';

export default class App extends React.Component{

  componentDidMount() {
    ReactDOM
      .findDOMNode(this)
      .offsetParent
      .addEventListener('keydown', function (e) {
        var intKey = (window.Event) ? e.which : e.keyCode;

        if (intKey === 37) {
          Actions.sliderPrev();
        }

        if (intKey === 39) {
          Actions.sliderNext();
        }
      }.bind(this));
  }

  render() {
    return (
      <DocumentTitle title='SaleOn - Всі акції Україні'>
        <div>
          <TopNav />
          <Slider />
          {this.props.children}
        </div>
      </DocumentTitle>
    );
  }
}
