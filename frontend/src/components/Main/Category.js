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
            entriesRaw: json.entries,
            isLoading: false
          });
        } else {
          this.setState({
            isLoading: false,
            entriesRaw: null
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

  render() {
    let dateArray = this.state.dateArray;
    let entriesArray;
    if (this.state.entriesRaw === null) {
      entriesArray = dateArray.map(date => {
        return (
          <Entry
            key={date}
            date={date}
            value={0}
            goal={this.props.category.goal}
            description={''}
            title={''}
            complete={false}
          />
        );
      });
    } else {
      entriesArray = dateArray.map(date => {
        let index = this.state.entries.indexOf(date);
        if (index !== -1) {
          let entry = this.state.entries[index];
          return (
            <Entry
              key={date}
              date={date}
              value={entry.value}
              goal={this.props.category.goal}
              description={entry.description}
              title={entry.title}
              complete={true}
            />
          );
        } else {
          return (
            <Entry
              key={date}
              date={date}
              value={0}
              goal={this.props.category.goal}
              description={''}
              title={''}
              complete={false}
            />
          );
        }
      });
    }

    return (
      <section>
        <h2>{this.props.category.name}</h2>
        {entriesArray}
      </section>
    );
  }
}

export default Category;
