import React, { Component } from 'react';
import 'whatwg-fetch';

class NewCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFormOpen: false,
      categoryName: '',
      categoryGoal: '',
      categoryUnit: '',
      newCategoryError: '',
      isLoading: false
    };

    this.onTextBoxChange = this.onTextBoxChange.bind(this);
    this.onSubmitNewCategory = this.onSubmitNewCategory.bind(this);
    this.openNewCategoryForm = this.openNewCategoryForm.bind(this);
    this.closeNewCategoryForm = this.closeNewCategoryForm.bind(this);
  }

  onTextBoxChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  onSubmitNewCategory() {
    const { categoryName, categoryGoal, categoryUnit } = this.state;

    this.setState({ isLoading: true });
    // Send request to server
    fetch('/api/category/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: categoryName,
        goal: categoryGoal,
        unit: categoryUnit,
        userId: this.props.user._id
      })
    })
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({
            newCategoryError: json.message,
            isLoading: false,
            categoryName: '',
            categoryGoal: '',
            categoryUnit: '',
            isFormOpen: false
          });
        } else {
          this.setState({
            newCategoryError: json.message,
            isLoading: false
          });
        }
      });
  }

  openNewCategoryForm() {
    this.setState({
      isFormOpen: true
    });
  }

  closeNewCategoryForm() {
    this.setState({
      isFormOpen: false
    });
  }

  render() {
    const {
      isFormOpen,
      categoryName,
      categoryGoal,
      categoryUnit,
      newCategoryError
    } = this.state;
    if (!isFormOpen) {
      return <button onClick={this.openNewCategoryForm}>New Category</button>;
    } else {
      return (
        <div>
          <button onClick={this.closeNewCategoryForm}>Close</button>
          <p>New Category</p>
          {newCategoryError ? <p>{newCategoryError}</p> : null}
          <label>
            Category Name:
            <input
              type="text"
              name="categoryName"
              value={categoryName}
              placeholder="Read"
              onChange={this.onTextBoxChange}
            />
          </label>
          <br />
          <label>
            Category Goal:
            <input
              type="number"
              name="categoryGoal"
              value={categoryGoal}
              placeholder="30"
              onChange={this.onTextBoxChange}
            />
          </label>
          <br />
          <label>
            Category Unit(s):
            <input
              type="text"
              name="categoryUnit"
              value={categoryUnit}
              placeholder="Minutes"
              onChange={this.onTextBoxChange}
            />
          </label>
          <br />
          <button onClick={this.onSubmitNewCategory}>
            Create New Category
          </button>
        </div>
      );
    }
  }
}

export default NewCategory;
