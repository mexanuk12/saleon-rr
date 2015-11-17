import Reflux     from 'reflux';
import Actions from './../Actions';

const TopNavStore = Reflux.createStore({
  listenables: [Actions],
  data: {},

  onInitTopNav() {
    this.data = {
      items: {
        geo: {
          alias: "GeoFilter",
          itemClass: "fa-globe",
          title: "Регіони",
          isActive: false
        },
        categories: {
          alias: "CategoriesFilter",
          itemClass: "fa-list",
          title: "Категорії",
          isActive: false
        },
        brands: {
          alias: "BrandsFilter",
          itemClass: "fa-tags",
          title: "Бренди",
          isActive: false
        },
        subscription: {
          alias: "Subscription",
          itemClass: "fa-pencil",
          title: "Підписка",
          isActive: false
        },
        user: {
          alias: "User",
          itemClass: "fa-user",
          title: "Користувач",
          isActive: false
        },
        partner: {
          alias: "Partner",
          itemClass: "fa-briefcase",
          title: "Партнерам",
          isActive: false
        }
      },
      current: null
    };
    this.trigger(this.data);
  },

  setActiveTab: function (tabIndex) {
    if (typeof this.data.items[tabIndex] !== "undefined") {
      this.data.items[tabIndex].isActive = true;
    }
    this.trigger(this.data);
  },

  onClearCurrentTab: function () {
    this.data.current = null;
    this.trigger(this.data);
  },

  onSetNavTab: function (tabIndex) {
    var current = null;
    if (typeof this.data.items[tabIndex] !== "undefined") {
      current = tabIndex;
    }
    this.data.current = current;
    this.trigger(this.data);
  }

});

export default TopNavStore;
