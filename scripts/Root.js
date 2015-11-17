import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';

//Pages components
import App         from './pages/App';
import DetailsPage from './pages/DetailsPage';
import FilterPage  from './pages/FilterPage';

export default class Root extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  }

  render() {
    const { history } = this.props;
    return (
      <Router history={history}>
        <Route path='/' component={App} >
          <IndexRoute component={null} />
          <Route path='show' component={DetailsPage} >
            <Route path=':id' component={DetailsPage}/>
          </Route>

          <Route path='filter' component={null} >
            <Route path=':filterId' component={FilterPage} />
          </Route>
        </Route>
      </Router>
    );
  }
}
