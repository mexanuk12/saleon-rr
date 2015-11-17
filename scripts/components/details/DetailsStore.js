import Reflux from 'reflux';
import Actions from '../Actions';

const DetailsStore = Reflux.createStore({
  listenables: [Actions],

  // Constants
  DETAILS_MAIN: "main",
  DETAILS_DESCR: "description",
  DETAILS_LOCATION: "location",
  sourceUrl: "http://saleon.info/ad",

  // Main data
  data: {},

  init() {
    this.listenTo(Actions.fetchDetails,this.onFetchDetails);
  },

  getInitialState() {
    this.data = {
      ad: null,
      current: this.DETAILS_MAIN
    };

    return this.data;
  },

  onFetchDetails(id) {
    $.ajax({
      url: this.sourceUrl,
      data: {
        id: id,
        json: 1
      },
      dataType: 'json',
      cache: false,
      context: this,
      success: function(res) {
        this.data.ad = res;
        this.data.current = this.DETAILS_MAIN;
        this.trigger(this.data);
      }
    });
  },

  onGotoPage(pageAlias) {
    this.data.current = pageAlias;
    this.trigger(this.data);
  }

});

export default DetailsStore;
