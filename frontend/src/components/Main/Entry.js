import React, { Component } from 'react';
import 'whatwg-fetch';

class Entry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isFormOpen: false,
      isDetailOpen: false,
      errorMessage: '',
      entryTitle: '',
      entryDescription: '',
      entryValue: 0,
      categoryId: this.props.categoryId,
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
    const {
      entryTitle,
      entryDescription,
      entryValue,
      date,
      categoryId
    } = this.state;

    this.setState({ isLoading: true });

    fetch('/api/entry/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: entryTitle,
        description: entryDescription,
        value: entryValue,
        date: date,
        categoryId: categoryId
      })
    })
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({
            entryTitle: '',
            entryDescription: '',
            entryValue: 0,
            errorMessage: '',
            isLoading: false,
            isFormOpen: false,
            isDetailOpen: false
          });
        } else {
          this.setState({
            isLoading: false,
            errorMessage: json.message
          });
        }
      });
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
      errorMessage,
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
          {errorMessage ? <p>{errorMessage}</p> : null}
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
              required={true}
            />
            /{goal + ' ' + unit}
          </label>
          <br />
          <button onClick={this.submitEntry}>Submit</button>
        </div>
      );
    }
  }
}

export default Entry;
