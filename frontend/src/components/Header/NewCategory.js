import React, { Component } from 'react';
import 'whatwg-fetch';

class NewCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFormOpen: false,
      categoryName: '',
      categoryGoal: 0,
      categoryUnit: ''
    };

    this.onTextBoxChange = this.onTextBoxChange.bind(this);
    this.onSubmitNewCategory = this.onSubmitNewCategory.bind(this);
  }

  onTextBoxChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  onSubmitNewCategory() {}

  render() {
    return <button>New Category</button>;
  }
}

export default NewCategory;
