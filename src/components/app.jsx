import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchClients } from '../actions/index';

import ShowCalendars from './show_calendars';
import AddCalendar from './add_calendar';
import EditCalendar from './edit_calendar';
import EditChallenge from './edit_challenge';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      view: ''
    };

    this.viewShowCalendars = this.viewShowCalendars.bind(this);
    this.viewAddCalendar = this.viewAddCalendar.bind(this);
    this.viewEditCalendar = this.viewEditCalendar.bind(this);
    this.viewEditChallenge = this.viewEditChallenge.bind(this);
  }

  componentDidMount() {
    this.props.fetchClients();
    this.viewShowCalendars();
  }

  viewShowCalendars() {
    this.setState({
      view: <ShowCalendars handleAddClick={this.viewAddCalendar} />
    });
  }

  viewAddCalendar() {
    this.setState({
      view: <AddCalendar
        handleCancelClick={this.viewShowCalendars}
        handleNextClick={this.viewEditCalendar} />
    });
  }

  viewEditCalendar() {
    this.setState({
      view: <EditCalendar handleCancelClick={this.viewShowCalendars} />
    });
  }

  viewEditChallenge() {
    this.setState({
      view: <EditChallenge handleCancelClick={this.viewEditCalendar} />
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
