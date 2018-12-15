import React, {Component} from 'react';
import {NavLink, withRouter} from 'react-router-dom';

import Search from './Search';

class Navigation extends Component {

  handleRoute = text => {
    this.props.history.push(`/search/${text}`);
  }

  render() {
    // Builds top navigation with NavLink
    return (
      <header>
        <ul className="main-nav">
          <Search onSubmit={this.handleRoute}/>
          <li><NavLink to="/kittens">Kittens</NavLink></li>
          <li><NavLink to="/puppies">Puppies</NavLink></li>
          <li><NavLink to="/red panda">Red Panda</NavLink></li>
        </ul>
      </header>
    );
  }

}

export default withRouter(Navigation);

