import React, { Component } from 'react';

class ViewSwitcher extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.switchToLogView = this.switchToLogView.bind(this);
    this.switchToMainView = this.switchToMainView.bind(this);
  }

  switchToLogView() {
    this.props.updateView('Log');
  }

  switchToMainView() {
    this.props.updateView('Main');
  }

  render() {
    const view = this.props.view;
    return (
      <div>
        <p>Switch Views</p>
        <button disabled={view === 'Main'} onClick={this.switchToMainView}>
          Main
        </button>
        <button disabled={view === 'Log'} onClick={this.switchToLogView}>
          Log
        </button>
      </div>
    );
  }
}

export default ViewSwitcher;
