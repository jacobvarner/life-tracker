import React, { Component } from 'react';
import 'whatwg-fetch';

class Entry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFormOpen: false,
      isDetailOpen: false,
      date: this.props.date,
      value: this.props.value,
      goal: this.props.goal,
      unit: this.props.unit,
      title: this.props.title,
      description: this.props.description,
      complete: this.props.complete
    };

    this.openEntryDetail = this.openEntryDetail.bind(this);
    this.openEntryForm = this.openEntryForm.bind(this);
    this.submitEntry = this.submitEntry.bind(this);
  }

  openEntryDetail() {
    this.setState({ isDetailOpen: true });
  }

  openEntryForm() {
    this.setState({ isFormOpen: true, isDetailOpen: true });
  }

  submitEntry() {
    // Will handle submitting new entry and editing existing entry
    this.setState({ isFormOpen: false, isDetailOpen: false });
  }

  render() {
    const {
      isFormOpen,
      isDetailOpen,
      date,
      value,
      goal,
      unit,
      title,
      description,
      complete
    } = this.state;

    if (!isDetailOpen) {
      return (
        <button onClick={complete ? this.openEntryDetail : this.openEntryForm}>
          <p>{date.toLocaleDateString()}</p>
          {complete ? (
            <p>{value + '/' + goal + ' ' + unit}</p>
          ) : (
            <p>New Entry</p>
          )}
        </button>
      );
    } else if (!isFormOpen) {
      return (
        <div>
          <p>{date.toLocaleDateString()}</p>
          <h2>{title}</h2>
          <p>{description}</p>
          <p>{value + '/' + goal + ' ' + unit}</p>
          <button onClick={this.openEntryForm}>Edit</button>
        </div>
      );
    } else {
      return (
        <div>
          <p>This will be a form...</p>
          <button onClick={this.submitEntry}>Submit</button>
        </div>
      );
    }
  }
}

export default Entry;
