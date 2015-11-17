import React       from 'react';
import ReactDOM    from 'react-dom';
import Reflux      from 'reflux';
import topNavStore from './TopNavStore';

export default class MobileNav extends React.Component{
  mixins = [
    Reflux.connect(topNavStore, 'topNavStore')
  ]

  constructor() {
    super();
    this.state = {
      isClosed: true
    }
  }

  close() {
    this.$node = $(ReactDOM.findDOMNode(this));
    this.$node.collapse('close');
  }

  componentDidMount() {
    let self = this;
    this.$node = $(ReactDOM.findDOMNode(this));
    this.$node.on("show.bs.collapse", function () {
      self.setState({
        isClosed: false
      });
    });

    this.$node.on("hidden.bs.collapse", function () {
      self.setState({
        isClosed: true
      });
    });

    this.$node.collapse("hide");
  }

  componentWillUnmount() {
    this.$node = $(ReactDOM.findDOMNode(this));
    this.$node.off("show.bs.collapse");
    this.$node.off("hidden.bs.collapse");
  }

  toggleMenu() {
    this.$node = $(ReactDOM.findDOMNode(this));
    this.$node.collapse('toggle');
  }

  render() {
    return (
      <nav className={"navbar navbar-default navbar-fixed-top visible-xs-block " + (this.state.isClosed ? "closed" : "") } data-toggle="collapse" data-target="#xsNavBody" aria-expanded="false">
        <div className="top-bg"></div>
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" >
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="/index.php">
              <img src="static/img/logo.png" />
            </a>
          </div>
          <div className="collapse navbar-collapse" id="xsNavBody">
            <ul className="nav navbar-nav">
                {this.props.children}
            </ul>
          </div>
        </div>
      </nav>
    )
  }
};
