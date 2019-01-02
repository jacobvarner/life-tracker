import React, { Component } from 'react';
import 'whatwg-fetch';

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
      signUpPassword: ''
    };

    this.onTextBoxChange = this.onTextBoxChange.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoading: false });
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
    const { signUpEmail, signUpPassword } = this.state;

    this.setState({ isLoading: true });

    // Send request to server
    fetch('/api/account/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: signUpEmail,
        password: signUpPassword
      })
    })
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({
            signUpError: json.message,
            isLoading: false,
            signUpEmail: '',
            signUpPassword: ''
          });
        } else {
          this.setState({
            signUpError: json.message,
            isLoading: false
          });
        }
      });
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
      signInPassword
    } = this.state;

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
            <button>Sign In</button>
          </div>
          <br />
          <br />
          <div>
            {signUpError ? <p>{signUpError}</p> : null}
            <p>Sign Up</p>
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
        <p>Signed in</p>
      </div>
    );
  }
}

export default Home;
