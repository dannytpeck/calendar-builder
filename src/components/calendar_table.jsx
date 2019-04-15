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

      this.setState({ calendars: [...this.state.calendars, ...records] });

      // Activate tooltip
      $('.share-icon').tooltip({
        html: true,
        trigger: 'click'
      });

      fetchNextPage();
    }, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
  }

  editCalendar(calendar) {
    const hash = calendar.fields.hash;
    window.open(
      `https://calendarbuilder.dev.adurolife.com/calendar-builder/#/${hash}`,
      '_blank'
    );
  }

  uploadCalendar(calendar) {
    const hash = calendar.fields.hash;
    window.open(
      `https://calendarbuilder.dev.adurolife.com/shiny-stone/compile/index.html#?calendar=${hash}`,
      '_blank'
    );
  }

  openDeleteConfirmModal(calendarToDelete) {
    /* global $ */
    $('#confirm-modal').modal();
    $('.modal-body').html('<p>Are you sure you want to delete this calendar?</p>');
    $('.modal-footer .btn-danger').off('click');
    $('.modal-footer .btn-danger').click(() => {
      this.deleteCalendar(calendarToDelete);
    });
  }

  deleteCalendar(calendarToDelete) {
    base('Calendars').destroy(calendarToDelete.id, (err, deletedRecord) => {
      if (err) {
        console.error(err);
        return;
      }

      // Hide the ConfirmModal
      $('#confirm-modal').modal('hide');

      // Remove calendar from view
      let updatedCalendars = this.state.calendars.filter(calendar => calendar.id !== deletedRecord.id);
      this.setState({
        calendars: updatedCalendars
      });

      // Remove challenges from airtable
      base('Challenges').select({
        view: 'Default',
        filterByFormula: `{Calendar}='${calendarToDelete.fields['hash']}'`
      }).eachPage((records, fetchNextPage) => {
        records.map(record => {
          base('Challenges').destroy(record.id, (err, deletedRecord) => {
            if (err) {
              console.error(err);
              return;
            }
          });
        });
        fetchNextPage();
      }, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });

    });
  }

  renderRow(calendar) {
    const { name, year, updated, status, hash } = calendar.fields;

    return (
      <tr key={calendar.id}>
        <td>{name}</td>
        <td>{year}</td>
        <td>{updated}</td>
        <td>{status}</td>
        <td>
          <img onClick={() => this.editCalendar(calendar)} className="edit-icon" src="images/icon_edit.svg" />

          <img className="share-icon"
            type="image"
            src="images/icon_link.svg"
            data-toggle="tooltip"
            data-placement="bottom"
            title={`<h5 class='my-3'>Link to this Calendar</h5><h5 class='my-3'>https://calendarbuilder.dev.adurolife.com/calendar-builder/#/${hash}</h5>`} />

          <img onClick={() => this.uploadCalendar(calendar)} className="upload-icon" src="images/icon_upload.svg" />
          <img onClick={() => this.openDeleteConfirmModal(calendar)} className="delete-icon" src="images/icon_delete.svg" />
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
