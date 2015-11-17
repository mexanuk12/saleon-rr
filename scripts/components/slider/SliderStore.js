import Reflux from 'reflux';
import Actions from '../Actions';

const SliderStore = Reflux.createStore({
  listenables: [Actions],

  // Constants
  ITEMS_PER_PAGE: 12,
  PAGE_CURRENT: "page-current",
  PAGE_PREV: "page-prev",
  PAGE_NEXT: "page-next",
  PAGE_PREVING: "page-preving",
  PAGE_NEXTING: "page-nexting",
  PAGE_NONE: "page-none",
  blocked: false,
  sourceUrl: "http://saleon.info/ad/list",

  // Main data
  data: [],
  params: {
    geo: null,
    brand: null,
    category: null,
    get_data: true
  },

  init() {
    this.listenTo(Actions.getSliderData,this.onGetSliderData);
  },

  onGetSliderData() {
    this.fetchList();
  },

  fetchList() {
    this.params.get_data = true;
    $.ajax({
      url: this.sourceUrl,
      data: this.params,
      dataType: 'json',
      cache: false,
      context: this,
      type: 'get',
      success: function(data) {
        var data = data.list;
        var pages = this.preparePages(data);
        this.data = pages;
        this.trigger(this.data);
      }
    });
  },

  map(data) {
    var map = [];
    for (var key in data) {
      map.push(data[key].state);
    }
    return map;
  },

  getCurrentIndex(map) {
    for (var key in map) {
      if (this.PAGE_CURRENT == map[key]) {
        return new Number(key).valueOf();
      }
    }
    return 0;
  },

  onSliderNext() {
    var data = this.data;
    var pagesCount = data.length;
    if (pagesCount <=1) {
      return true;
    }
    if (!this.blocked) {
      var self = this;
      this.blocked = true;
      var timeout = setTimeout(function () {
        self.blocked = false;
        clearTimeout(timeout);
      }, 700);


      if (pagesCount == 2) {
        if (data[1].state == this.PAGE_CURRENT) {
          return true;
        } else {
          data[1].state = this.PAGE_CURRENT;
          data[0].state = this.PAGE_NEXT;
          this.trigger(data);
          return true;
        }
      }

      var map = this.map(data);
      var currentIndex = this.getCurrentIndex(map);
      currentIndex++;

      if (currentIndex == data.length) {
        currentIndex = 0;
      }

      var mapPrevIndex = currentIndex + 1;
      var mapNextIndex = currentIndex - 1;

      if (mapPrevIndex >= data.length) {
        mapPrevIndex = 0;
      }

      if (mapNextIndex < 0) {
        mapNextIndex = data.length - 1;
      }

      for (var key in data) {
        data[key].state = this.PAGE_NONE;
      }

      data[mapPrevIndex].state = this.PAGE_PREVING;
      data[currentIndex].state = this.PAGE_CURRENT;
      data[mapNextIndex].state = this.PAGE_NEXT;

      this.data = data;
      this.trigger(data);
    }
  },

  onSliderPrev() {
    var data = this.data;
    var pagesCount = data.length;
    if (pagesCount <= 1) {
      return true;
    }

    if (!this.blocked) {
      var self = this;
      this.blocked = true;
      var timeout = setTimeout(function () {
        self.blocked = false;
        clearTimeout(timeout);
      }, 700);

      if (pagesCount == 2) {
        if (data[0].state == this.PAGE_CURRENT) {
          return true;
        } else {
          data[0].state = this.PAGE_CURRENT;
          data[1].state = this.PAGE_PREV;
          this.trigger(data);
          return true;
        }
      }

      var map = this.map(data);
      var currentIndex = this.getCurrentIndex(map);
      currentIndex--;

      if (currentIndex == -1) {
        currentIndex = data.length - 1;
      }

      var mapPrevIndex = currentIndex + 1;
      var mapNextIndex = currentIndex - 1;

      if (mapPrevIndex >= data.length) {
        mapPrevIndex = 0;
      }

      if (mapNextIndex < 0) {
        mapNextIndex = data.length - 1;
      }

      for (var key in data) {
        data[key].state = this.PAGE_NONE;
      }

      data[mapPrevIndex].state = this.PAGE_PREV;
      data[currentIndex].state = this.PAGE_CURRENT;
      data[mapNextIndex].state = this.PAGE_NEXTING;

      this.data = data;
      this.trigger(data);
    }
  },

  setParam(paramName, paramValue) {
    if (paramName == 'geo') {
      this.params = {};
    } else if (paramName == 'category') {
      this.params["brand"] = null;
    } else if (paramName == 'brand') {
      this.params["category"] = null;
    }

    this.params[paramName] = paramValue;
    this.fetchList();
  },

  getPagesCount(data) {
    return Math.ceil(data.length / this.ITEMS_PER_PAGE);
  },

  getPage(data, pageNumber) {
    var start = this.ITEMS_PER_PAGE * pageNumber;
    var end = (this.ITEMS_PER_PAGE * (pageNumber + 1));
    var data = data.slice(start, end);
    return data;
  },

  preparePages(data) {
    if (!data.length) {
      return {};
    }
    var pagesCount = this.getPagesCount(data);
    var pages = [];
    for (var i=0; i<pagesCount; i++) {
      var state = this.PAGE_NONE;

      switch (i) {
        case 1:
          state = this.PAGE_PREV;
          break;

        case 0:
          state = this.PAGE_CURRENT;
          break;

        case (pagesCount-1):
          state = this.PAGE_NEXT;
          break;
      }

      pages.push({
        data: this.getPage(data, i),
        state: state
      });
    }

    return pages;
  }

});

export default SliderStore;
