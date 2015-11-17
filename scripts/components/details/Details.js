import React              from 'react';
import Reflux             from 'reflux';
import Actions            from '../Actions';
import Modal              from './../modal/Modal';
import DetailsMain        from './DetailsMain';
import DetailsDescription from './DetailsDescription';
import DetailsLocation    from './DetailsLocation';
import DetailsStore       from './DetailsStore';
import AppHistory          from './../../AppHistory';

export default class Details extends React.Component{

  DETAILS_MAIN = "main";
  DETAILS_DESCR = "description";
  DETAILS_LOCATION = "location";

  constructor() {
    super();
    this.state = {
      detailsStore: {
        ad: null
      }
    }
  }

  componentDidMount() {
    this.unsubscribe = DetailsStore.listen(this.onStateChange.bind(this));
    this.openDetailsDialog();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onStateChange(state) {
    this.setState({ "detailsStore": state });
  }

  componentDidUpdate() {
    this.openDetailsDialog();
  }

  openDetailsDialog() {
    if (this.props.id) {
      var detailsStore = this.state.detailsStore;
      if (detailsStore.ad !== null) {
        this.refs.modal.open()
      } else {
        Actions.fetchDetails(this.props.id);
      }
    }
  }

  handleClose() {
    AppHistory.replaceState(null, '/');
  }

  render() {
    var self = this;
    var data = this.state.detailsStore.ad;
    var content = null;

    if (data === null) {
      return (<div></div>)
    }

    switch (this.state.detailsStore.current) {
      case this.DETAILS_MAIN:
        content = (<DetailsMain ad={data} />);
        break;

      case this.DETAILS_DESCR:
        content = (<DetailsDescription description={data.full_description}/>);
        break;

      case this.DETAILS_LOCATION:
        content = (<DetailsLocation location={data.address} addresses={data.addresses.list}/>);
        break;
    }

    return (
      <Modal ref="modal" isOpen={data !== null} title={data.name} onModalClose={this.handleClose}>
        <div className="details-modal">
          <div className="details-nav btn-group btn-group-justified">
            <a onClick={function() { Actions.gotoPage(self.DETAILS_MAIN) }} className={ "btn btn-default" + (this.state.detailsStore.current === this.DETAILS_MAIN ? " active" : "") }>Акція</a>
            {data.full_description ? <a onClick={function() { Actions.gotoPage(self.DETAILS_DESCR) }} className={ "btn btn-default" + (this.state.detailsStore.current === this.DETAILS_DESCR ? " active" : "") }>Деталі</a> : null }
            <a onClick={function() { Actions.gotoPage(self.DETAILS_LOCATION) }} className={ "btn btn-default" + (this.state.detailsStore.current === this.DETAILS_LOCATION ? " active" : "") }>Мапа</a>
          </div>
          <div className="details-content">
            {content}
          </div>
        </div>
      </Modal>
    );

  }
}
