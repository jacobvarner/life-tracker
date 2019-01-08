import React, { Component } from 'react';

class Category extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return <section>{this.props.category.name}</section>;
  }
}

export default Category;
