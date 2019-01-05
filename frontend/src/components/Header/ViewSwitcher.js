import React, { Component } from 'react';
import 'whatwg-fetch';

class ViewSwitcher extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.switchToLogView = this.switchToLogView.bind(this);
    this.switchToMainView = this.switchToMainView.bind(this);
  }

  switchToLogView() {
    this.props.updateView('log');
  }

  switchToMainView() {
    this.props.updateView('main');
  }

  render() {
    const view = this.props.view;
    return (
      <div>
        <p>Switch Views</p>
        <button disabled={view === 'main'} onClick={this.switchToMainView}>
          Main
        </button>
        <button disabled={view === 'log'} onClick={this.switchToLogView}>
          Log
        </button>
      </div>
    );
  }
}

export default ViewSwitcher;
