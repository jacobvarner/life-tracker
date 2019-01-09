import React, { Component } from 'react';
import 'whatwg-fetch';

class Category extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    };

    this.getEntries = this.getEntries.bind(this);
  }

  componentDidMount() {
    this.getEntries();
  }

  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(this.props.startDate) !==
      JSON.stringify(prevProps.startDate)
    ) {
      this.getEntries();
    }
  }

  getEntries() {
    let start = this.props.startDate;
    let end = this.props.endDate;
    let id = this.props.category._id;

    console.log('front end start: ' + start);
    console.log('front end end: ' + end);

    this.setState({ isLoading: true });

    fetch('/api/entry?id=' + id + '&start=' + start + '&end=' + end)
      .then(res => res.json())
      .then(json => {
        if (json.success) {
        }
      })
      .then(this.setState({ isLoading: false }));
  }

  render() {
    return <section>{this.props.category.name}</section>;
  }
}

export default Category;
