import React, { Component } from 'react';

import Account from './Account';
import NewCategory from './NewCategory';
import ViewSwitcher from './ViewSwitcher';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <header>
        <h1>Life Tracker</h1>
        <nav />

        {this.props.currentUser && (
          <ViewSwitcher
            view={this.props.view}
            updateView={this.props.updateView}
          />
        )}

        {this.props.currentUser && (
          <NewCategory user={this.props.currentUser} />
        )}

        <Account
          updateTokenAndUser={this.props.updateTokenAndUser}
          currentUser={this.props.currentUser}
          token={this.props.token}
          updateView={this.props.updateView}
        />

        <hr />
      </header>
    );
  }
}

export default Header;
