import React      from 'react';
import ReactDOM   from 'react-dom';
import Root       from './Root';
import AppHistory from './AppHistory';

const rootEl = document.getElementById('app');

ReactDOM.render(<Root history={AppHistory} />, rootEl);
