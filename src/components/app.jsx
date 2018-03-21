import React, { Component } from 'react';
import axios from 'axios';
import Airtable from 'airtable';
const base = new Airtable({ apiKey: 'keyCxnlep0bgotSrX' }).base('appN1J6yscNwlzbzq');

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
      selectedChallenge: null,
      programYear: null
    };

    this.selectClient = this.selectClient.bind(this);
    this.selectCalendar = this.selectCalendar.bind(this);
    this.selectChallenge = this.selectChallenge.bind(this);
    this.viewShowCalendars = this.viewShowCalendars.bind(this);
    this.viewAddCalendar = this.viewAddCalendar.bind(this);
    this.viewEditCalendar = this.viewEditCalendar.bind(this);
    this.viewEditChallenge = this.viewEditChallenge.bind(this);
    this.addChallengeToCalendar = this.addChallengeToCalendar.bind(this);
    this.saveCalendar = this.saveCalendar.bind(this);
    this.setProgramYear = this.setProgramYear.bind(this);
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

  saveCalendar() {
    const calendar = this.state.selectedCalendar;
    const employerName = this.state.selectedClient.fields['Limeade e='];

    const url = 'https://api.airtable.com/v0/appN1J6yscNwlzbzq/Challenges?api_key=keyCxnlep0bgotSrX';
    calendar.map(challenge => {
      delete challenge.fields.id;
      challenge.fields['EmployerName'] = employerName;

      if (!challenge.fields['Program Year']) {
        challenge.fields['Program Year'] = this.state.programYear;
      }

      base('Challenges').create(challenge.fields, function(err, record) {
        if (err) {
          console.error(err);
          return;
        }
        console.log(record.getId());
      });

      // axios.post(url, { fields: challenge.fields })
      //   .catch(error => console.error(error));
    });

    this.viewShowCalendars();

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

  setProgramYear(year) {
    this.setState({ programYear: year });
  }

  addChallengeToCalendar(challenge) {
    const newCalendar = [...this.state.selectedCalendar, challenge];
    this.setState({ selectedCalendar: newCalendar, selectedChallenge: null });
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
            handleNextClick={this.viewEditCalendar}
            setProgramYear={this.setProgramYear} />
        );
      case 'EditCalendar':
        return (
          <EditCalendar
            selectedClient={this.state.selectedClient}
            selectedCalendar={this.state.selectedCalendar}
            selectedChallenge={this.state.selectedChallenge}
            handleCancelClick={this.viewShowCalendars}
            handleDoneClick={this.saveCalendar}
            handleEditChallengeClick={this.viewEditChallenge}
            selectChallenge={this.selectChallenge}
            addChallengeToCalendar={this.addChallengeToCalendar} />
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
