import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import Account from './Account';
import NewCategory from './NewCategory';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <header>
        <Link to="/">Home</Link>

        <nav />

        {this.props.currentUser && (
          <NewCategory user={this.props.currentUser} />
        )}

        <Account
          updateTokenAndUser={this.props.updateTokenAndUser}
          currentUser={this.props.currentUser}
          token={this.props.token}
        />

        <hr />
      </header>
    );
  }
}

export default Header;
