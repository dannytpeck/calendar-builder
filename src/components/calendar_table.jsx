import React, { Component } from 'react';
import axios from 'axios';

class CalendarTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      calendars: []
    };

    this.renderRow = this.renderRow.bind(this);
    this.editCalendar = this.editCalendar.bind(this);
  }

  componentDidMount() {
    this.fetchCalendars();
  }

  fetchCalendars() {
    const client = this.props.selectedClient;
    const url = 'https://api.airtable.com/v0/appN1J6yscNwlzbzq/Calendars?api_key=keyCxnlep0bgotSrX';

    axios.get(url)
      .then(response => this.setState({ calendars: response.data.records }))
      .catch(error => console.error(error));
  }

  editCalendar(calendar) {
    this.props.selectCalendar(calendar);
    this.props.handleEditClick();
  }

  renderRow(calendar) {
    return (
      <tr key={calendar.id}>
        <td>{calendar.name}</td>
        <td>{calendar.year}</td>
        <td>{calendar.updated}</td>
        <td>{calendar.status}</td>
        <td>
          <img onClick={() => this.editCalendar(calendar)} className="edit-icon" src="images/icon_edit.svg" />
        </td>
        <td>
          <img className="delete-icon" src="images/icon_delete.svg" />
        </td>
      </tr>
    );
  }

  render() {
    const filteredCalendars = this.state.calendars.filter(calendar => {
      return calendar.fields.client[0] === this.props.selectedClient.id;
    });

    return (
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Program Year</th>
            <th>Last Update</th>
            <th>Status</th>
            <th>Actions</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredCalendars.map(calendar => this.renderRow(calendar.fields))}
        </tbody>
      </table>
    );
  }
}

export default CalendarTable;
