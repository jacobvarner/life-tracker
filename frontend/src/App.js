import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Life Tracker</h1>
        <NewUserForm />
      </div>
    );
  }
}

class NewUserForm extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.sendToServer = this.sendToServer.bind(this);

    this.state = {
      name: '',
      email: '',
      salt: '',
      hash: ''
    };
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    const name = this.state.name;
    const email = this.state.email;
    const hash = this.state.hash;
    const salt = this.state.salt;

    this.sendToServer(name, email, hash, salt);

    alert(
      'New User Created!\n' + name + '\n' + email + '\n' + hash + '\n' + salt
    );

    event.preventDefault();
  }

  sendToServer(name, email, hash, salt) {
    axios.post('/api/new-user', {
      name: name,
      email: email,
      hash: hash,
      salt: salt
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input
            name="name"
            type="text"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Email:
          <input
            name="email"
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Hash:
          <input
            name="hash"
            type="password"
            value={this.state.hash}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Salt:
          <input
            name="salt"
            type="password"
            value={this.state.salt}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default App;
