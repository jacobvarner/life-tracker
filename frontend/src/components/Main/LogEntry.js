import React, { Component } from 'react';
import 'whatwg-fetch';

class LogEntry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isFormOpen: false,
      errorMessage: '',
      entryTitle: this.props.entry.title,
      entryDescription: this.props.entry.description,
      entryValue: this.props.entry.value
    };

    this.submitEntry = this.submitEntry.bind(this);
    this.openEntryForm = this.openEntryForm.bind(this);
    this.deleteEntry = this.deleteEntry.bind(this);
    this.onTextBoxChange = this.onTextBoxChange.bind(this);
  }

  submitEntry() {
    const { entryTitle, entryDescription, entryValue } = this.state;
    const date = this.props.entry.date;
    const categoryId = this.props.category._id;

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
          this.props.update();
        } else {
          this.setState({
            isLoading: false,
            errorMessage: json.message
          });
        }
      });
  }

  openEntryForm() {
    this.setState({
      isFormOpen: true
    });
  }

  deleteEntry() {
    let response = window.confirm(
      'Are you sure you want to delete this entry? This cannot be undone.'
    );
    if (response) {
      this.setState({ isLoading: true });
      fetch('/api/entry/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: this.props.entry._id
        })
      })
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({ isLoading: false }, () => this.props.update());
          } else {
            this.setState({ isLoading: false });
          }
        });
    }
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
    let date = new Date(this.props.entry.date);
    date = date.toLocaleDateString();
    if (this.state.isLoading) {
      return <p>Loading...</p>;
    }

    if (!this.state.isFormOpen) {
      return (
        <div>
          <p>{date}</p>
          <h3>{this.props.entry.title}</h3>
          <p>{this.props.entry.description}</p>
          <p>
            {this.props.entry.value +
              '/' +
              this.props.category.goal +
              ' ' +
              this.props.category.unit}
          </p>
          <button onClick={this.openEntryForm}>Edit</button>
          <button onClick={this.deleteEntry}>Delete</button>
        </div>
      );
    } else {
      return (
        <div>
          {this.state.errorMessage ? <p>{this.state.errorMessage}</p> : null}
          <label>
            Entry Title
            <br />
            <input
              type="text"
              name="entryTitle"
              value={this.state.entryTitle}
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
              value={this.state.entryDescription}
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
              value={this.state.entryValue}
              onChange={this.onTextBoxChange}
              required={true}
            />
            /{this.props.category.goal + ' ' + this.props.category.unit}
          </label>
          <br />
          <button onClick={this.submitEntry}>Submit</button>
        </div>
      );
    }
  }
}

export default LogEntry;
