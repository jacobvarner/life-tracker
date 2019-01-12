import React, { Component } from 'react';
import 'whatwg-fetch';
import { setInStorage, getFromStorage } from '../../utils/storage';

class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      signUpError: '',
      signInError: '',
      signInEmail: '',
      signInPassword: '',
      signUpEmail: '',
      signUpPassword: '',
      signUpFirstName: '',
      signUpLastName: '',
      currentForm: 'links'
    };

    this.onTextBoxChange = this.onTextBoxChange.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
    this.logout = this.logout.bind(this);
    this.openSignIn = this.openSignIn.bind(this);
    this.openSignUp = this.openSignUp.bind(this);
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
      signUpPassword,
      signUpConfirmPassword
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
        confirmPassword: signUpConfirmPassword,
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
            signUpConfirmPassword: '',
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
          this.props.updateTokenAndUser(json.token, json.user);
          this.props.updateView('Main');
          this.setState({
            signInError: json.message,
            isLoading: false,
            signInPassword: '',
            signInEmail: ''
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
            this.props.updateTokenAndUser('', '');
            this.props.updateView('Home');
            this.setState({
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

  openSignIn() {
    this.setState({
      currentForm: 'signin'
    });
  }

  openSignUp() {
    this.setState({
      currentForm: 'signup'
    });
  }

  render() {
    const {
      isLoading,
      signUpError,
      signUpEmail,
      signUpPassword,
      signUpConfirmPassword,
      signInError,
      signInEmail,
      signInPassword,
      signUpFirstName,
      signUpLastName,
      currentForm
    } = this.state;

    let user =
      this.props.currentUser.firstName + ' ' + this.props.currentUser.lastName;

    if (isLoading) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      );
    }

    if (!this.props.token) {
      if (currentForm === 'links') {
        return (
          <div>
            <button onClick={this.openSignIn}>Sign In</button>
            <button onClick={this.openSignUp}>Sign Up</button>
          </div>
        );
      } else if (currentForm === 'signin') {
        return (
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
                required={true}
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
                required={true}
              />
            </label>
            <br />
            <button onClick={this.onSignIn}>Sign In</button>
            <button onClick={this.openSignUp}>New? Sign Up</button>
          </div>
        );
      } else if (currentForm === 'signup') {
        return (
          <div>
            {signUpError ? <p>{signUpError}</p> : null}
            <p>Sign Up</p>
            <label>
              First Name:
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
                required={true}
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
                required={true}
              />
            </label>
            <br />
            <label>
              Confirm Password:
              <input
                type="password"
                name="signUpConfirmPassword"
                value={signUpConfirmPassword}
                onChange={this.onTextBoxChange}
                required={true}
              />
            </label>
            <br />
            <button onClick={this.onSignUp}>Sign Up</button>
            <button onClick={this.openSignIn}>Returning? Sign In</button>
          </div>
        );
      }
    }

    return (
      <div>
        <p>Hello, {user}!</p>
        <button onClick={this.logout}>Logout</button>
      </div>
    );
  }
}

export default Account;
