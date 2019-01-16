import React, { Component } from 'react';
import 'whatwg-fetch';

class LogEntry extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return <p>{this.props.entry.title}</p>;
  }
}

export default LogEntry;
