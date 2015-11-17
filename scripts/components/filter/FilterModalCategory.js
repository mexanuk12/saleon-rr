import React           from 'react';
import FilterItemsList from './filterItemsList';
import SliderStore     from './../slider/SliderStore';
import TopNavStore     from './../topnav/TopNavStore';
import Actions         from '../Actions';

export default class FilterModalCategory extends React.Component{
  constructor() {
    super();
    this.state = {
      current: 1
    }
  }

  itemClick(item) {
    Actions.setParam("category", item.seo_name);

    if (this.props.closeModal) {
      this.props.closeModal();
    }
    //TopNavStore.setActiveTab("categories");
  }

  setPage(i) {
    this.setState({
      current: i
    });
  }

  render() {
    var data = this.props.data;
    var content = <FilterItemsList onItemClick={this.itemClick} items={data[this.state.current].sub} />;
    return (
      <div className="content" id="category-group-list">
        <div className="row">
          <div className="col-xs-12 in-dialog-nav">
            <div className="details-nav btn-group btn-group-justified upper-menu">
              <a onClick={this.setPage.bind(this, 1)} className={"btn btn-default" + (this.state.current === 1 ? " active" : "")}>{data[1].name}</a>
              <a onClick={this.setPage.bind(this, 2)} className={"btn btn-default" + (this.state.current === 2 ? " active" : "")}>{data[2].name}</a>
            </div>
          </div>
        </div>
        <div className="in-dialog-items">
          {content}
        </div>
      </div>
    );
  }
}
