import Reflux from 'reflux';
import Actions from '../Actions';

const FiltersStore = Reflux.createStore({
  listenables: [Actions],

  FILTER_GEO: "geo",
  FILTER_CATEGORIES: "categories",
  FILTER_BRANDS: "brands",
  FILTER_LOGIN: "user",
  FILTER_SUBSCRIPTION: "subscription",
  sourceUrl: {
    categories: "http://saleon.info/categories/list",
    brands: "http://saleon.info/brands/list",
    geo: "http://saleon.info/geo/list"
  },

  // Main data
  data: {},

  getInitialState: function() {
    this.data = {
      categories: null,
      brands: null,
      geo: null,
      current: null,
      formData: {}
    };

    return this.data;
  },

  init:function() {

    // register actions & bind to functions
    this.listenTo(Actions.fetchCategories, this.fetchCategories);
    this.listenTo(Actions.fetchBrands, this.fetchBrands);
    this.listenTo(Actions.fetchGeo, this.fetchGeo);
    this.listenTo(Actions.fetchFilter, this.onFetchFilter);

    this.listenTo(Actions.setNavPage, this.onSetNavPage);
    this.listenTo(Actions.clearCurrentFilter, this.onClearCurrentFilter);
    
  },

  onClearCurrentFilter: function () {
    this.data = {
      categories: null,
      brands: null,
      geo: null,
      current: null,
      formData: {}
    };

    this.trigger(this.data);
  },

  fetchCategories: function() {
    this.fetch(this.FILTER_CATEGORIES);
  },

  fetchBrands: function() {
    this.fetch(this.FILTER_BRANDS);
  },

  fetchGeo: function(id) {
    this.fetch(this.FILTER_GEO, id);
  },

  geoReset: function () {
    this.fetchGeo(1);
  },

  onFetchFilter(filter, id) {
    this.fetch(filter, id);
  },

  fetch: function(filter, id) {
    var self = this;
    var data = {};
    if (id) {
      data.term = id;
    }

    $.ajax({
      url: this.sourceUrl[filter],
      data: data,
      dataType: 'json',
      cache: false,
      context: this,
      success: function(res) {
        self.data[filter] = res;
        self.data.current = filter;
        self.trigger(self.data);
      }
    });
  },

  onSetNavPage: function (value) {
    this.data.current = value;
    this.trigger(this.data);
  }

});

export default FiltersStore;
