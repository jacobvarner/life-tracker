import React, { Component } from 'react';

class LogCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      entries: ''
    };

    this.getEntries = this.getEntries.bind(this);
  }

  getEntries() {}

  render() {
    return <div />;
  }
}

export default LogCategory;
