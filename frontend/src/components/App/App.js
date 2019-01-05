import React, { Component } from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';

import 'whatwg-fetch';
import { getFromStorage } from '../../utils/storage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      token: '',
      currentUser: ''
    };

    this.updateTokenAndUser = this.updateTokenAndUser.bind(this);
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

  updateTokenAndUser(token, user) {
    this.setState({ currentUser: user, token: token });
  }

  render() {
    return (
      <div>
        <Header
          updateTokenAndUser={this.updateTokenAndUser}
          currentUser={this.state.currentUser}
          token={this.state.token}
        />
        <Main />
        <Footer />
      </div>
    );
  }
}

export default App;
