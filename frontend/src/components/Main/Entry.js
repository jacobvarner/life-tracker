import React, { Component } from 'react';
import 'whatwg-fetch';

class Entry extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return <p>{this.props.date.toLocaleDateString()}</p>;
  }
}

export default Entry;
