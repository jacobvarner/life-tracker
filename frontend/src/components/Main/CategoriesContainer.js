import React, { Component } from 'react';
import Category from './Category';

class CategoriesContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let categories = this.props.categories;

    if (!categories) {
      return <div>Failed</div>;
    }
    const listCategories = categories.map(category => {
      return <Category key={category.name} category={category} />;
    });

    return <ul>{listCategories}</ul>;
  }
}

export default CategoriesContainer;
