import React, { Component } from 'react';

class ShowArchived extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: ''
    };

    this.toggle = this.toggle.bind(this);
  }

  componentWillMount() {
    if (this.props.archived) {
      this.setState({ message: 'Hide Archived' });
    } else {
      this.setState({ message: 'Show Archived' });
    }
  }

  toggle() {
    let archived = this.props.archived;
    console.log('archived: ' + archived);
    if (archived) {
      this.props.updateShowArchived(!archived);
      this.setState({
        message: 'Hide Archived'
      });
    } else {
      this.props.updateShowArchived(!archived);
      this.setState({
        message: 'Show Archived'
      });
    }
  }

  render() {
    return <button onClick={this.toggle}>{this.state.message}</button>;
  }
}

export default ShowArchived;
