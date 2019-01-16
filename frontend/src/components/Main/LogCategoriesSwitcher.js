import React, { Component } from 'react';

class LogCategoriesSwitcher extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let categories = this.props.categories;
    let listCategories = categories.map(category => {
      return (
        <button
          disabled={category.name === this.props.currentCategory.name}
          onClick={() => this.props.updateCategory(category)}
          key={category.name}
        >
          {category.name}
        </button>
      );
    });
    return <div>{listCategories}</div>;
  }
}

export default LogCategoriesSwitcher;
