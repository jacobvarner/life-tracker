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
      currentUser: '',
      view: 'main'
    };

    this.updateTokenAndUser = this.updateTokenAndUser.bind(this);
    this.updateView = this.updateView.bind(this);
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

  updateView(view) {
    this.setState({ view: view });
  }

  render() {
    return (
      <div>
        <Header
          updateTokenAndUser={this.updateTokenAndUser}
          currentUser={this.state.currentUser}
          token={this.state.token}
          updateView={this.updateView}
          view={this.state.view}
        />
        <Main currentUser={this.state.currentUser} view={this.state.view} />
        <Footer />
      </div>
    );
  }
}

export default App;
