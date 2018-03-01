import React, { Component } from 'react';
import axios from 'axios';

import ShowCalendars from './show_calendars';
import AddCalendar from './add_calendar';
import EditCalendar from './edit_calendar';
import EditChallenge from './edit_challenge';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      view: null,
      clients: [],
      selectedClient: null,
      selectedCalendar: null,
      selectedChallenge: null
    };

    this.selectClient = this.selectClient.bind(this);
    this.selectCalendar = this.selectCalendar.bind(this);
    this.selectChallenge = this.selectChallenge.bind(this);
    this.viewShowCalendars = this.viewShowCalendars.bind(this);
    this.viewAddCalendar = this.viewAddCalendar.bind(this);
    this.viewEditCalendar = this.viewEditCalendar.bind(this);
    this.viewEditChallenge = this.viewEditChallenge.bind(this);
  }

  // When app starts, fetch clients and set initial view
  componentDidMount() {
    this.fetchClients();
    this.setState({ view: 'ShowCalendars' });
  }

  fetchClients() {
    const url = 'https://api.airtable.com/v0/appN1J6yscNwlzbzq/Clients?api_key=keyCxnlep0bgotSrX';

    axios.get(url)
      .then(response => this.setState({ clients: response.data.records }))
      .catch(error => console.error(error));
  }

  selectClient(client) {
    this.setState({ selectedClient: client });
  }

  selectCalendar(calendar) {
    this.setState({ selectedCalendar: calendar });
  }

  selectChallenge(challenge) {
    this.setState({ selectedChallenge: challenge });
  }

  renderView(view) {
    switch (view) {
      case 'ShowCalendars':
        return (
          <ShowCalendars
            clients={this.state.clients}
            selectedClient={this.state.selectedClient}
            selectClient={this.selectClient}
            selectCalendar={this.selectCalendar}
            handleEditClick={this.viewEditCalendar}
            handleAddClick={this.viewAddCalendar} />
        );
      case 'AddCalendar':
        return (
          <AddCalendar
            selectedClient={this.state.selectedClient}
            handleCancelClick={this.viewShowCalendars}
            handleNextClick={this.viewEditCalendar} />
        );
      case 'EditCalendar':
        return (
          <EditCalendar
            selectedClient={this.state.selectedClient}
            selectedCalendar={this.state.selectedCalendar}
            handleCancelClick={this.viewShowCalendars}
            selectChallenge={this.selectChallenge}
            handleEditChallengeClick={this.viewEditChallenge} />
        );
      case 'EditChallenge':
        return (
          <EditChallenge
            selectedChallenge={this.state.selectedChallenge}
            handleCancelClick={this.viewEditCalendar} />
        );
    }
  }

  viewShowCalendars() {
    this.setState({ view: 'ShowCalendars' });
  }

  viewAddCalendar() {
    this.setState({ view: 'AddCalendar' });
  }

  viewEditCalendar(calendar) {
    if (calendar.length > 0) {
      this.setState({
        view: 'EditCalendar',
        selectedCalendar: calendar
      });
    } else {
      this.setState({ view: 'EditCalendar' });
    }
  }

  viewEditChallenge() {
    this.setState({ view: 'EditChallenge' });
  }

  render() {
    console.log(this.state);

    return (
      <div className="app">

        {this.renderView(this.state.view)}

      </div>
    );
  }
}

export default App;
