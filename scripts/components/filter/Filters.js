import React               from 'react';
import Reflux              from 'reflux';
import Actions             from '../Actions';
import Modal               from './../modal/Modal';
import FilterModalGeo      from './FilterModalGeo';
import FilterModalCategory from './FilterModalCategory';
import FilterModalBrand    from './FilterModalBrand';
// import Login               from './../login/login';
import FiltersStore        from './FiltersStore';
import TopNavStore         from './../topnav/TopNavStore';
import AppHistory          from './../../AppHistory';

export default class Filters extends React.Component {
  constructor() {
    super();
    this.state = {
      topNavStore: null,
      filtersStore: null
    }
  }

  componentDidMount() {
    this.unsubscribeFiltersStore = FiltersStore.listen(this.onFilterChange.bind(this));
    this.unsubscribeTopNavStore = TopNavStore.listen(this.onTopNavChange.bind(this));

    if (this.props.id) {
      Actions.setNavPage(this.props.id);
      Actions.setNavTab(this.props.id);
    }

    this.openModal();
  }

  componentWillUnmount() {
    this.unsubscribeFiltersStore();
    this.unsubscribeTopNavStore();
  }

  onFilterChange(state) {
    this.setState({ filtersStore: state });
  }

  onTopNavChange(state) {
    this.setState({ topNavStore: state });
  }

  openModal() {
    var topNavStore;
    if (topNavStore = this.state.topNavStore) {
      if (topNavStore.current !== null && this.refs.modal) {
        this.refs.modal.open()
      }
    }
  }

  componentDidUpdate() {
    this.openModal();
  }

  closeModal() {
    if (this.refs.modal) {
      this.refs.modal.close();
      var timeout = setTimeout(function () {
        Actions.clearCurrentFilter();
        Actions.clearCurrentTab();
        AppHistory.replaceState(null, '/');
        clearTimeout(timeout);
      }, 0);
    }
  }

  geoGoBack() {
    Actions.geoReset();
  }

  render() {
    var topNav_store = this.state.topNavStore;
    var filters_store = this.state.filtersStore;
    var content = null;
    var returnCallback = null;
    var title = "Empty";
    var emptyEl = (<div></div>);

    if (topNav_store === null) {
      return emptyEl;
    }

    if (topNav_store.current === null) {
      return emptyEl;
    }

    if (!filters_store[topNav_store.current]) {
      Actions.fetchFilter(topNav_store.current);
      return emptyEl;
    }

    switch (topNav_store.current) {
      case FiltersStore.FILTER_GEO:
        content = <FilterModalGeo closeModal={this.closeModal.bind(this)} data={filters_store.geo} />;
        returnCallback = this.geoGoBack;
        break;

      case FiltersStore.FILTER_CATEGORIES:
          content = <FilterModalCategory closeModal={this.closeModal.bind(this)} data={filters_store.categories}/>;
        break;

      case FiltersStore.FILTER_BRANDS:
      case FiltersStore.FILTER_SUBSCRIPTION:
        content = <FilterModalBrand closeModal={this.closeModal.bind(this)} data={filters_store.brands}/>;
        break;

      case FiltersStore.FILTER_LOGIN :
        content = <Login />;
        break;
    }

    title = topNav_store.items[topNav_store.current].title;

    return (
      <Modal ref="modal" title={title} returnCallback={returnCallback} onModalClose={this.closeModal.bind(this)}>
        {content}
      </Modal>
    );
  }
}
