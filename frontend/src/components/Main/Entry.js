import React, { Component } from 'react';
import 'whatwg-fetch';

class Entry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFormOpen: false,
      date: this.props.date,
      value: this.props.value,
      goal: this.props.goal,
      unit: this.props.unit,
      title: this.props.title,
      description: this.props.description,
      complete: this.props.complete
    };
  }

  render() {
    const {
      isFormOpen,
      date,
      value,
      goal,
      unit,
      title,
      description,
      complete
    } = this.state;

    if (!isFormOpen) {
      return (
        <button>
          <p>{date.toLocaleDateString()}</p>
          {complete ? (
            <p>{value + '/' + goal + ' ' + unit}</p>
          ) : (
            <p>New Entry</p>
          )}
        </button>
      );
    }
    return (
      <div>
        <p>{this.props.date.toLocaleDateString()}</p>
        <p>{this.props.value}</p>
        <p>{this.props.goal + ' ' + this.props.unit}</p>
        <p>{this.props.title}</p>
        <p>{this.props.description}</p>
      </div>
    );
  }
}

export default Entry;
