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
      selectedClient: null
    };

    this.selectClient = this.selectClient.bind(this);
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

  renderView(view) {
    switch (view) {
      case 'ShowCalendars':
        return (
          <ShowCalendars
            clients={this.state.clients}
            selectedClient={this.state.selectedClient}
            selectClient={this.selectClient}
            handleEditClick={this.viewEditCalendar}
            handleAddClick={this.viewAddCalendar} />
        );
        break;
    }
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
    console.log(this.state);

    return (
      <div className="app">

        {this.renderView(this.state.view)}

      </div>
    );
  }
}

export default App;
