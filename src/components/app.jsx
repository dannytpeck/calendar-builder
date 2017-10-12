import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchClients } from '../actions/index';

import ShowCalendars from './show_calendars';
import AddCalendar from './add_calendar';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      view: ''
    };

    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchClients();
    this.setState({
      view: <ShowCalendars handleAddClick={this.handleAddClick} />
    });
  }

  handleAddClick() {
    this.setState({
      view: <AddCalendar handleCancelClick={this.handleCancelClick} />
    });
  }

  handleCancelClick() {
    this.setState({
      view: <ShowCalendars handleAddClick={this.handleAddClick} />
    });
  }

  render() {
    return (
      <div className="app">

        {this.state.view}

      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
    client: state.selectedClient
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchClients }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
