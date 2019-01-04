import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import Account from './Account';
import NewCategory from './NewCategory';
import 'whatwg-fetch';
import { getFromStorage } from '../../utils/storage';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: '',
      currentUser: '',
      isLoading: false
    };
  }

  componentDidMount() {
    const obj = getFromStorage('life-tracker');
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch('/api/account/verify?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token,
              currentUser: json.user,
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false
            });
          }
        });
    } else {
      this.setState({
        isLoading: false
      });
    }
  }

  render() {
    return (
      <header>
        <Link to="/">Home</Link>

        <nav />

        {this.state.currentUser && (
          <NewCategory user={this.state.currentUser} />
        )}

        <Account />

        <hr />
      </header>
    );
  }
}

export default Header;
