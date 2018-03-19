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
    const employerName = calendar.fields.client;
    const programYear = calendar.fields.year;
    const url = `https://api.airtable.com/v0/appN1J6yscNwlzbzq/Challenges?api_key=keyCxnlep0bgotSrX&view=Default&filterByFormula=AND({EmployerName}='${employerName}',{Program Year}='${programYear}')`;

    axios.get(url)
      .then(response => {
        this.props.selectCalendar(response.data.records);
        this.props.handleEditClick(response.data.records);
      })
      .catch(error => console.error(error));
  }

  deleteCalendar(calendarToDelete) {
    const url = `https://api.airtable.com/v0/appN1J6yscNwlzbzq/Calendars/${calendarToDelete.id}?api_key=keyCxnlep0bgotSrX`;

    // Remove calendar from DB
    axios.delete(url).then(response => {
      // Then remove calendar from view
      let updatedCalendars = this.state.calendars.filter(calendar => calendar.id !== calendarToDelete.id);
      this.setState({
        calendars: updatedCalendars
      });
    }).catch(error => console.error(error));

  }

  renderRow(calendar) {
    const { name, year, updated, status } = calendar.fields;

    return (
      <tr key={calendar.id}>
        <td>{name}</td>
        <td>{year}</td>
        <td>{updated}</td>
        <td>{status}</td>
        <td>
          <img onClick={() => this.editCalendar(calendar)} className="edit-icon" src="images/icon_edit.svg" />
        </td>
        <td>
          <img onClick={() => this.deleteCalendar(calendar)} className="delete-icon" src="images/icon_delete.svg" />
        </td>
      </tr>
    );
  }

  render() {
    const filteredCalendars = this.state.calendars.filter(calendar => {
      return calendar.fields.client === this.props.selectedClient.fields['Limeade e='];
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
          {filteredCalendars.map(calendar => this.renderRow(calendar))}
        </tbody>
      </table>
    );
  }
}

export default CalendarTable;
