import React, { Component } from 'react';

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
      return <li key={category.name}>{category.name}</li>;
    });

    return <ul>{listCategories}</ul>;
  }
}

export default CategoriesContainer;
