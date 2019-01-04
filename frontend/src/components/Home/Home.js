import React, { Component } from 'react';
import 'whatwg-fetch';
import { setInStorage, getFromStorage } from '../../utils/storage';
import { timingSafeEqual } from 'crypto';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: '',
      signUpError: '',
      signInError: '',
      signInEmail: '',
      signInPassword: '',
      signUpEmail: '',
      signUpPassword: '',
      signUpFirstName: '',
      signUpLastName: '',
      currentUser: ''
    };

    this.onTextBoxChange = this.onTextBoxChange.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
    this.logout = this.logout.bind(this);
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

  onTextBoxChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  onSignUp() {
    const {
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword
    } = this.state;

    this.setState({ isLoading: true });

    // Send request to server
    fetch('/api/account/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: signUpEmail,
        password: signUpPassword,
        firstName: signUpFirstName,
        lastName: signUpLastName
      })
    })
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({
            signUpError: json.message,
            isLoading: false,
            signUpEmail: '',
            signUpPassword: '',
            signUpFirstName: '',
            signUpLastName: ''
          });
        } else {
          this.setState({
            signUpError: json.message,
            isLoading: false
          });
        }
      });
  }

  onSignIn() {
    // Grab state
    const { signInEmail, signInPassword } = this.state;
    this.setState({
      isLoading: true
    });
    // Post request to backend
    fetch('/api/account/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword
      })
    })
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          setInStorage('life-tracker', { token: json.token });
          this.setState({
            signInError: json.message,
            isLoading: false,
            signInPassword: '',
            signInEmail: '',
            token: json.token,
            currentUser: json.user
          });
        } else {
          this.setState({
            signInError: json.message,
            isLoading: false
          });
        }
      });
  }

  logout() {
    this.setState({
      isLoading: true,
      signInError: ''
    });
    const obj = getFromStorage('life-tracker');
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch('/api/account/logout?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            localStorage.removeItem('life-tracker');
            this.setState({
              token: '',
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
    const {
      isLoading,
      token,
      signUpError,
      signUpEmail,
      signUpPassword,
      signInError,
      signInEmail,
      signInPassword,
      signUpFirstName,
      signUpLastName,
      currentUser
    } = this.state;

    let user = currentUser.firstName + ' ' + currentUser.lastName;

    if (isLoading) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      );
    }

    if (!token) {
      return (
        <div>
          <div>
            {signInError ? <p>{signInError}</p> : null}
            <p>Sign In</p>
            <label>
              Email:
              <input
                type="email"
                name="signInEmail"
                placeholder="placeholder@example.com"
                value={signInEmail}
                onChange={this.onTextBoxChange}
              />
            </label>
            <br />
            <label>
              Password:
              <input
                type="password"
                name="signInPassword"
                value={signInPassword}
                onChange={this.onTextBoxChange}
              />
            </label>
            <br />
            <button onClick={this.onSignIn}>Sign In</button>
          </div>
          <br />
          <br />
          <div>
            {signUpError ? <p>{signUpError}</p> : null}
            <p>Sign Up</p>
            <label>
              FirstName:
              <input
                type="text"
                name="signUpFirstName"
                placeholder="Alex"
                value={signUpFirstName}
                onChange={this.onTextBoxChange}
              />
            </label>
            <label>
              Last Name:
              <input
                type="text"
                name="signUpLastName"
                placeholder="Smith"
                value={signUpLastName}
                onChange={this.onTextBoxChange}
              />
            </label>
            <br />
            <label>
              Email:
              <input
                type="email"
                name="signUpEmail"
                placeholder="placeholder@example.com"
                value={signUpEmail}
                onChange={this.onTextBoxChange}
              />
            </label>
            <br />
            <label>
              Password:
              <input
                type="password"
                name="signUpPassword"
                value={signUpPassword}
                onChange={this.onTextBoxChange}
              />
            </label>
            <br />
            <button onClick={this.onSignUp}>Sign Up</button>
          </div>
        </div>
      );
    }

    return (
      <div>
        <p>Hello, {user}!</p>
        <button onClick={this.logout}>Logout</button>
      </div>
    );
  }
}

export default Home;
