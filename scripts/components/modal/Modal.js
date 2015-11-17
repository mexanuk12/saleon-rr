import React from 'react';
import ReactDOM from 'react-dom';

export default class Modal extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false
    }
  }

  open() {
    this.setState({
      isOpen: true
    });
  }

  close() {
    this.setState({
      isOpen: false
    });
  }

  componentDidMount() {
    if (this.props.isOpen) {
      this.open();
    }

    this.$node = $(ReactDOM.findDOMNode(this));
    this.$node.on('hidden.bs.modal', this.onModalClose.bind(this));

    this.interfaceWithBootstrap();
  }

  componentDidUpdate() {
    this.interfaceWithBootstrap();
  }

  componentWillUnmount() {
    this.$node = $(ReactDOM.findDOMNode(this));
    this.$node.off('hidden.bs.modal');
  }

  onModalClose(e) {
    if (typeof this.props.onModalClose !== "undefined") {
      this.props.onModalClose(e);
    }
  }

  interfaceWithBootstrap() {
    this.$node = $(ReactDOM.findDOMNode(this));
    if (this.state.isOpen) {
      this.$node.modal("show");
    } else {
      this.$node.modal("hide");
    }
  }

  render() {
    var extraBtns = [];

    if (this.props.returnCallback) {
      extraBtns.push(<button type="button" className="btn btn-primary back-btn" onClick={this.props.returnCallback}>Назад</button>);
    }

    return (
      <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Закрити"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title" id="myModalLabel">{this.props.title ? this.props.title : ""}</h4>
            </div>
            <div className="modal-body">
              {this.props.children}
            </div>
            <div className="modal-footer">
              {extraBtns}
              <button type="button" className="btn btn-default" data-dismiss="modal">Закрити</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
