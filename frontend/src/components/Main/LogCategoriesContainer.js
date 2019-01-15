import React, { Component } from 'react';
import LogCategoriesSwitcher from './LogCategoriesSwitcher';

class LogCategoriesContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      currentCategory: ''
    };

    this.updateCategory = this.updateCategory.bind(this);
  }

  updateCategory(category) {
    this.setState({
      currentCategory: category
    });
  }

  render() {
    return (
      <div>
        <LogCategoriesSwitcher
          categories={this.props.categories}
          updateCategory={this.updateCategory}
          currentCategory={this.state.currentCategory}
        />
        <p>Current Category: {this.state.currentCategory}</p>
      </div>
    );
  }
}

export default LogCategoriesContainer;
