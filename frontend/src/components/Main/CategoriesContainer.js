import React, { Component } from 'react';
import Category from './Category';

class CategoriesContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      startDate: '',
      endDate: '',
      today: ''
    };

    this.getCurrentWeek = this.getCurrentWeek.bind(this);
    this.moveWeekForward = this.moveWeekForward.bind(this);
    this.moveWeekBackward = this.moveWeekBackward.bind(this);
  }

  componentDidMount() {
    this.getCurrentWeek();
  }

  getCurrentWeek() {
    let today = new Date();
    let todayString = today.toLocaleDateString();
    let sixDaysAgo = new Date(today - 518400000);
    let sixDaysAgoString = sixDaysAgo.toLocaleDateString();
    this.setState({
      today: todayString,
      endDate: todayString,
      startDate: sixDaysAgoString
    });
  }

  moveWeekForward() {
    if (this.state.weekEnd === this.state.today) {
      return { success: false, message: 'Error: You are already at today.' };
    } else {
      let weekStart = new Date(
        new Date(this.state.weekStart) + 604800000
      ).toLocaleDateString();
      let weekEnd = new Date(
        new Date(this.state.weekEnd) + 604800000
      ).toLocaleDateString();
      this.setState({
        weekStart: weekStart,
        weekEnd: weekEnd
      });
    }
  }

  moveWeekBackward() {
    let weekStart = new Date(
      new Date(this.state.weekStart) - 604800000
    ).toLocaleDateString();
    let weekEnd = new Date(
      new Date(this.state.weekEnd) - 604800000
    ).toLocaleDateString();
    this.setState({
      weekStart: weekStart,
      weekEnd: weekEnd
    });
  }

  render() {
    let categories = this.props.categories;

    if (!categories) {
      return <div>Failed</div>;
    }
    const listCategories = categories.map(category => {
      return <Category key={category.name} category={category} />;
    });

    return (
      <div>
        <p>Today's Date: {this.state.today}</p>
        <p>Week Start: {this.state.startDate}</p>
        <p>Week End: {this.state.endDate}</p>
        <div>
          <button onClick={this.moveWeekBackward}>Back</button>
          <button onClick={this.getCurrentWeek}>Today</button>
          <button onClick={this.moveWeekForward}>Forward</button>
        </div>
        {listCategories}
      </div>
    );
  }
}

export default CategoriesContainer;
