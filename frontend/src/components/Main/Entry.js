import React, { Component } from 'react';
import 'whatwg-fetch';

class Entry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFormOpen: false,
      isDetailOpen: false,
      entryTitle: '',
      entryDescription: '',
      entryValue: '',
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
    this.onTextBoxChange = this.onTextBoxChange.bind(this);
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

  onTextBoxChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    const {
      isFormOpen,
      isDetailOpen,
      entryTitle,
      entryDescription,
      entryValue,
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
          <label>
            Entry Title
            <br />
            <input
              type="text"
              name="entryTitle"
              value={entryTitle}
              onChange={this.onTextBoxChange}
            />
          </label>
          <br />
          <label>
            Entry Description
            <br />
            <input
              type="text"
              name="entryDescription"
              value={entryDescription}
              onChange={this.onTextBoxChange}
            />
          </label>
          <br />
          <label>
            Entry Value
            <br />
            <input
              type="number"
              name="entryValue"
              value={entryValue}
              onChange={this.onTextBoxChange}
            />
            / {goal + ' ' + unit}
          </label>
          <br />
          <button onClick={this.submitEntry}>Submit</button>
        </div>
      );
    }
  }
}

export default Entry;
