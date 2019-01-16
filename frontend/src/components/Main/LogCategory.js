import React, { Component } from 'react';

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
  }

  componentWillMount() {
    this.getEntries();
  }

  getEntries() {
    let id = this.props.category._id;
    this.setState({ isLoading: true });
    fetch('/api/entry/log?categoryId=' + id + '&page=' + this.state.page)
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          if (json.entries.length < 10) {
            if (this.state.entries === '') {
              this.setState({
                isLoading: false,
                entries: json.entries,
                lastPage: true
              });
            } else {
              this.setState({
                isLoading: false,
                entries: this.state.entries.concat(json.entries),
                lastPage: true
              });
            }
          } else {
            // If an even 10 entries, make sure there is at least one more
            fetch(
              '/api/entry/log?categoryId=' + id + '&page=' + this.state.page + 1
            )
              .then(res => res.json())
              .then(json => {
                if (json.success) {
                  if (this.state.entries === '') {
                    this.setState({
                      isLoading: false,
                      entries: json.entries
                    });
                  } else {
                    this.setState({
                      isLoading: false,
                      entries: this.state.entries.concat(json.entries)
                    });
                  }
                } else {
                  if (this.state.entries === '') {
                    this.setState({
                      isLoading: false,
                      entries: json.entries,
                      lastPage: true
                    });
                  } else {
                    this.setState({
                      isLoading: false,
                      entries: this.state.entries.concat(json.entries),
                      lastPage: true
                    });
                  }
                }
              });
          }
        } else {
          this.setState({
            isLoading: false
          });
        }
      });
  }

  render() {
    return (
      <div>
        <p>Test</p>
      </div>
    );
  }
}

export default LogCategory;
