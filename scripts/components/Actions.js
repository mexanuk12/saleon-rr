import Reflux from 'reflux';

const Actions = Reflux.createActions([
  //details
  'fetchDetails',
  'gotoPage',
  //Slider actions
  'sliderNext',
  'sliderPrev',
  'getSliderData',
  'setParam',
  'fetchFilter',
  'clearCurrentFilter',
  'clearCurrentTab',
  //TopNav actions
  'fetchNavItems',
  'topNavActivate',
  'initTopNav',
  'setNavTab',
  'setNavPage',
  //filters
  'fetchCategories',
  'fetchBrands',
  'fetchGeo',
  'setName'
]);

export default Actions;
