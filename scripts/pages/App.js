import React from 'react';
import ReactDOM from 'react-dom';
import DocumentTitle from 'react-document-title';
import TopNav from './../components/topnav/TopNav';
import Slider from './../components/slider/Slider';
import Actions from './../components/Actions';

export default class App extends React.Component{

  componentDidMount() {
    ReactDOM
      .findDOMNode(this)
      .offsetParent
      .offsetParent
      .addEventListener('keydown', function (e) {
        let intKey = (window.Event) ? e.which : e.keyCode;

        if (intKey === 37) {
          Actions.sliderPrev();
        }

        if (intKey === 39) {
          Actions.sliderNext();
        }
      });
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
