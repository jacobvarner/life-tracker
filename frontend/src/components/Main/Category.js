import React, { Component } from 'react';
import 'whatwg-fetch';
import Entry from './Entry';

class Category extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      entries: '',
      dateArray: ''
    };

    this.getEntries = this.getEntries.bind(this);
    this.getDateArray = this.getDateArray.bind(this);
    this.archiveCategory = this.archiveCategory.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
  }

  componentWillMount() {
    this.getEntries();
    this.getDateArray();
  }

  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(this.props.startDate) !==
      JSON.stringify(prevProps.startDate)
    ) {
      this.getEntries();
      this.getDateArray();
    }
  }

  getEntries() {
    let start = this.props.startDate;
    let end = this.props.endDate;
    let id = this.props.category._id;

    this.setState({ isLoading: true });

    fetch('/api/entry?id=' + id + '&start=' + start + '&end=' + end)
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({
            entries: json.entries,
            isLoading: false
          });
        } else {
          this.setState({
            isLoading: false,
            entries: null
          });
        }
      });
  }

  getDateArray() {
    let start = new Date(this.props.startDate);
    let dateArray = [start];
    let oneDay = 24 * 60 * 60 * 1000;
    for (let i = 1; i < 7; i++) {
      let date = new Date(start.getTime() + i * oneDay);
      dateArray.push(date);
    }
    this.setState({ dateArray: dateArray });
  }

  archiveCategory() {
    let response = window.confirm(
      'You are about to archive the category for ' +
        this.props.category.name +
        '.\nIs this okay?'
    );
    if (response) {
      let archived = !this.props.category.archived;
      this.setState({ isLoading: true });
      fetch('/api/category/archive', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: this.props.category._id,
          archived: archived
        })
      })
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState(
              {
                isLoading: false
              },
              () => {
                this.props.update();
              }
            );
          }
          this.setState({ isLoading: false });
        });
    }
  }

  deleteCategory() {}

  render() {
    if (this.state.isLoading) {
      return <p>Loading...</p>;
    }
    const { dateArray, entries } = this.state;
    let entriesArray;
    if (entries === null) {
      entriesArray = dateArray.map(date => {
        return (
          <Entry
            key={date}
            categoryId={this.props.category._id}
            date={date}
            value={0}
            goal={this.props.category.goal}
            unit={this.props.category.unit}
            description={''}
            title={''}
            complete={false}
            update={this.getEntries}
          />
        );
      });
    } else {
      let entryDates = entries.map(entry => new Date(entry.date).getTime());
      entriesArray = dateArray.map(date => {
        let match = false;
        let entry = {};
        if (date.getTime() === entryDates[0]) {
          entry = entries.shift();
          entryDates.shift();
          match = true;
        }
        if (match) {
          return (
            <Entry
              key={date}
              categoryId={this.props.category._id}
              date={date}
              value={entry.value}
              goal={this.props.category.goal}
              unit={this.props.category.unit}
              description={entry.description}
              title={entry.title}
              complete={true}
              update={this.getEntries}
            />
          );
        } else {
          return (
            <Entry
              key={date}
              categoryId={this.props.category._id}
              date={date}
              value={0}
              goal={this.props.category.goal}
              unit={this.props.category.unit}
              description={''}
              title={''}
              complete={false}
              update={this.getEntries}
            />
          );
        }
      });
    }

    return (
      <section>
        <h2>{this.props.category.name}</h2>
        <button onClick={this.archiveCategory}>
          {this.props.category.archived ? 'Unarchive' : 'Archive'}
        </button>
        <button onClick={this.deleteCategory}>Delete</button>
        <br />
        {entriesArray}
      </section>
    );
  }
}

export default Category;
