import React, { Component } from 'react';
import 'whatwg-fetch';

class Category extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      entriesRaw: '',
      entriesWeekArray: '',
      dateArray: ''
    };

    this.getEntries = this.getEntries.bind(this);
    //this.assignEntries = this.assignEntries.bind(this);
    this.getDateArray = this.getDateArray.bind(this);
  }

  componentDidMount() {
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

  /*assignEntries() {
    let default = {complete: false, value: 0, date:}
    if (this.state.entriesRaw === null) {
    } else {

    }
  }*/

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
    return <section>{this.props.category.name}</section>;
  }
}

export default Category;
