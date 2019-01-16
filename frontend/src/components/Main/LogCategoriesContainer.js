import React, { Component } from 'react';
import LogCategoriesSwitcher from './LogCategoriesSwitcher';
import LogCategory from './LogCategory';

class LogCategoriesContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      currentCategory: ''
    };

    this.updateCategory = this.updateCategory.bind(this);
  }

  componentWillMount() {
    this.updateCategory(this.props.categories[0]);
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
        <LogCategory category={this.state.currentCategory} />
      </div>
    );
  }
}

export default LogCategoriesContainer;
