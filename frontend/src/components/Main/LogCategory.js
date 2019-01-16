import React, { Component } from 'react';
import LogEntry from './LogEntry';

class LogCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      entries: '',
      page: 0,
      lastPage: false
    };

    this.getEntries = this.getEntries.bind(this);
    this.loadPreviousEntries = this.loadPreviousEntries.bind(this);
    this.loadNextEntries = this.loadNextEntries.bind(this);
  }

  componentWillMount() {
    this.getEntries();
  }

  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(this.props.category.name) !==
      JSON.stringify(prevProps.category.name)
    ) {
      this.getEntries();
    }
  }

  getEntries() {
    let id = this.props.category._id;
    this.setState({ isLoading: true });
    fetch('/api/entry/log?categoryId=' + id + '&page=' + this.state.page)
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          let entries = json.entries;
          if (entries.length < 10) {
            this.setState({
              isLoading: false,
              entries: entries,
              lastPage: true
            });
          } else {
            // If an even 10 entries, make sure there is at least one more
            fetch(
              '/api/entry/log?categoryId=' + id + '&page=' + this.state.page + 1
            )
              .then(res => res.json())
              .then(json => {
                if (json.success) {
                  this.setState({
                    isLoading: false,
                    entries: entries,
                    lastPage: false
                  });
                } else {
                  this.setState({
                    isLoading: false,
                    entries: entries,
                    lastPage: true
                  });
                }
              });
          }
        } else {
          this.setState({
            isLoading: false,
            entries: ''
          });
        }
      });
  }

  loadNextEntries() {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => this.getEntries()
    );
  }

  loadPreviousEntries() {
    this.setState(
      {
        page: this.state.page - 1
      },
      () => this.getEntries()
    );
  }

  render() {
    if (this.state.isLoading) {
      return <p>Loading...</p>;
    }
    let entries = this.state.entries;
    if (entries === '') {
      return <p>No Entries</p>;
    }
    let entryComponents = entries.map(entry => {
      return <LogEntry entry={entry} key={entry._id} />;
    });
    return (
      <div>
        <h2>{this.props.category.name}</h2>
        {entryComponents}
        {this.state.page !== 0 ? (
          <button onClick={this.loadPreviousEntries}>Show Previous</button>
        ) : null}
        {!this.state.lastPage ? (
          <button onClick={this.loadNextEntries}>Show Next</button>
        ) : null}
      </div>
    );
  }
}

export default LogCategory;
