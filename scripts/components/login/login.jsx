var React = require('react');
var Reflux = require('reflux');

var Modal = require('./../modal/modal');
var Carousel =require('./carousel');

module.exports = Login = React.createClass({

  getInitialState: function() {
    return {
      isOpened: true
    }
  },

  open: function () {
    this.setState({
      isOpened: true
    });
  },

  componentDidUpdate: function () {
    if (this.state.isOpened) {
      this.refs.modal.open();
    }
  },

  componentDidMount: function () {
  },

  gotoSignIn: function () {
    this.refs.formContent.gotoSignIn();
  },

  gotoSignUp: function () {
    this.refs.formContent.gotoSignUp();
  },

  render: function () {
    var data = {name: "login"}


    if (this.refs.modal) {
      this.refs.modal.open();
    }

    return (
      <div className="details-modal">
        <div className="details-nav btn-group btn-group-justified">
          <a onClick={this.gotoSignIn} className="btn btn-default">Вхід</a>
          <a onClick={this.gotoSignUp} className="btn btn-default">Реєстрація</a>
        </div>
        <hr/>
        <Carousel ref="formContent" />
      </div>
    );

  }
});
