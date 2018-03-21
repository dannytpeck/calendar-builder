import React, { Component } from 'react';
import Airtable from 'airtable';
const base = new Airtable({ apiKey: 'keyCxnlep0bgotSrX' }).base('appN1J6yscNwlzbzq');

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
    base('Calendars').select().eachPage((records, fetchNextPage) => {

      this.setState({ calendars: records });

      fetchNextPage();
    }, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
  }

  editCalendar(calendar) {
    const employerName = calendar.fields.client;
    const programYear = calendar.fields.year;

    base('Challenges').select({
      view: 'Default',
      filterByFormula: `AND({EmployerName}='${employerName}',{Program Year}='${programYear}')`
    }).eachPage((records, fetchNextPage) => {

      this.props.setProgramYear(programYear);
      this.props.handleEditClick();

      fetchNextPage();
    }, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
  }

  deleteCalendar(calendarToDelete) {
    base('Calendars').destroy(calendarToDelete.id, (err, deletedRecord) => {
      if (err) {
        console.error(err);
        return;
      }

      // Remove calendar from view
      let updatedCalendars = this.state.calendars.filter(calendar => calendar.id !== deletedRecord.id);
      this.setState({
        calendars: updatedCalendars
      });
    });
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
