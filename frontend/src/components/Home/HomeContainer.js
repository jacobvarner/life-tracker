import React, { Component } from 'react';

class HomeContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <h2>Welcome to Life Tracker!</h2>
        <p>
          Life Tracker is a simple application for tracking daily tasks, habits,
          and goals. Life Tracker is aimed to help you track things that you do
          on a daily basis and aim to form new habits along the way.
        </p>
        <p>
          Life Tracker consists of <em>categories</em> that allow you to set a
          daily task and include your target goal for each day. Then within
          categories, there are <em>entries</em> for days that you complete a
          task or a certain portion of the goal for that day.{' '}
          <em>Categories</em> can be anything from 'coding 2 hours a day' to
          'walking 12,000 steps a day' and everything in between.
        </p>
        <p>
          Life Tracker allows you to keep up with your daily tasks and start to
          form habits and look back on all that you accomplish.
        </p>
        <hr />
        <p>
          <em>
            Life Tracker is a work in progress and is currently being developed
            on a MERN - MongoDB (Mongoose), Express, React, and Node.js - stack
          </em>
        </p>
      </div>
    );
  }
}

export default HomeContainer;
