import React from 'react';
import FilterItemsBlock from './filterItemsBlock';

export default class FilterModalBrand extends React.Component {
  render() {

    var data = null;

    return (
      <div className="content">
        <div className="row underconstruction-block">
          <div className="col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-3">
            <div className="well">
              <h3>Наразi цей функцiонал недоступний</h3>
              <p>Повертайтесь згодом</p>
            </div>
            <img style={{width: "100%"}} src="/underconstruction.jpg" />
          </div>
        </div>
      </div>
    );
  }
}
