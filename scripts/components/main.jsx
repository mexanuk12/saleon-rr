var React = require('react');
var Reflux = require('reflux');
var TopNav = require('./topnav/topNav');
var Slider = require('./slider/slider');
var Filters = require('./filter/filters');
var Details = require('./details/details');
var SliderStore = require('./slider/sliderStore');
//var DetailsStore = require('./details/detailsStore');
var DetailMap = require('./details/detailsMap');
var Login = require('./login/login');

module.exports = App = React.createClass({
  componentDidMount: function() {
    this
      .getDOMNode()
      .offsetParent
      .offsetParent
      .addEventListener('keydown', function (e) {
        var intKey = (window.Event) ? e.which : e.keyCode;

        if (intKey === 37) {
          SliderStore.sliderPrev();
        }

        if (intKey === 39) {
          SliderStore.sliderNext();
        }
      }.bind(this));
  },

  render: function () {
    return (
      <div>
        <Filters />
        <TopNav />
        <Slider/>
        <Details />
      </div>
    )
  }
});