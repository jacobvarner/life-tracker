import React, { Component } from 'react';

class Category extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return <li>{this.props.category.name}</li>;
  }
}

export default Category;
