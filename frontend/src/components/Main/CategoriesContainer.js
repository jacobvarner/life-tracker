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

  moveWeekForward() {}

  moveWeekBackward() {}

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
        {listCategories}
      </div>
    );
  }
}

export default CategoriesContainer;
