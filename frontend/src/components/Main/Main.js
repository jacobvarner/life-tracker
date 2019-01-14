import React, { Component } from 'react';

import CategoriesContainer from './CategoriesContainer';
import ShowArchived from './ShowArchived';

import 'whatwg-fetch';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      showArchived: false,
      categories: ''
    };

    this.updateShowArchived = this.updateShowArchived.bind(this);
    this.updateCategories = this.updateCategories.bind(this);
  }

  abortController = new window.AbortController();

  componentDidMount() {
    this.updateCategories();
  }

  componentWillUnmount() {
    this.abortController.abort();
  }

  updateCategories() {
    let userId = this.props.currentUser._id;

    this.setState({
      isLoading: true
    });

    let query = '&archived=false';
    if (this.state.showArchived) {
      query = '';
    }

    fetch('/api/category?userId=' + userId + query, {
      method: 'GET',
      signal: this.abortController.signal
    })
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({
            isLoading: false,
            categories: json.categories
          });
        } else {
          this.setState({
            isLoading: false
          });
        }
      });
  }

  updateShowArchived(value) {
    this.setState(
      {
        showArchived: value
      },
      () => {
        this.updateCategories();
      }
    );
  }

  render() {
    let view = this.props.view;

    if (this.state.isLoading) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      );
    } else {
      return (
        <div>
          <h1>{view}</h1>
          {this.state.categories && (
            <CategoriesContainer
              categories={this.state.categories}
              update={this.updateCategories}
            />
          )}
          {!this.state.isLoading && (
            <ShowArchived
              archived={this.state.showArchived}
              updateShowArchived={this.updateShowArchived}
            />
          )}
        </div>
      );
    }
  }
}

export default Main;
