import React, { Component } from 'react';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let view = this.props.view.split('');
    view[0] = view[0].toUpperCase();
    view = view.join('');
    return <h1>{view}</h1>;
  }
}

export default Main;
