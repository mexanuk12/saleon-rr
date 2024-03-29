import React             from 'react';
import MobileNav         from './MobileNav';
import Actions           from './../Actions';
import DefaultTopNavItem from './DefaultTopNavItem';
import XsTopNavItem      from './XsTopNavItem';
import TopNavStore       from './TopNavStore';

export default class TopNav extends React.Component{
  constructor() {
    super();
    this.state = {
      topNavStore: null
    };
  }

  componentDidMount() {
    this.unsubscribe = TopNavStore.listen(this.onStateChange.bind(this));
    Actions.initTopNav();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onStateChange(state) {
    this.setState({ 'topNavStore': state });
  }

  render() {
    if (this.state.topNavStore === null) {
      return null;
    }
    let items = this.state.topNavStore.items;
    let currentItemIndex = this.state.topNavStore.current;
    let xsItemsList = [];
    let defaultItemsList = [];
    for (let keyName in items) {
      let item = items[keyName];
      xsItemsList.push(<XsTopNavItem
        isActive={item.isActive}
        isCurrent={keyName === currentItemIndex}
        item={item} key={item.alias}
        itemAlias={keyName} />
      );
      defaultItemsList.push(<DefaultTopNavItem
        isActive={item.isActive}
        isCurrent={keyName === currentItemIndex}
        item={item} key={item.alias}
        itemAlias={keyName} />
      );
    }

    defaultItemsList.splice(
      3,
      0,
      <div className='col-sm-2' key={'logo'}>
        <div className='logo'>
          <a href='/'>
            <img title='Головна' src='/static/img/logo.png'/>
          </a>
        </div>
      </div>
    );

    return (
      <div>
        <MobileNav ref='mobileNav'>
          {xsItemsList}
        </MobileNav>

        <nav id='mainNav' className='main-nav hidden-xs'>
          <div className='top-bg'></div>
          <div className='row'>
            <div className='col-sm-2 navbar-left'></div>
            {defaultItemsList || null}
            <div className='col-sm-2 navbar-right'>
            { ''/* <LangSelector /> */}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
