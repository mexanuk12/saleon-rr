import { createHistory, createHashHistory } from 'history';

const AppHistory = process.env.NODE_ENV === 'production' ?
  createHashHistory() :
  createHistory();

export default AppHistory;