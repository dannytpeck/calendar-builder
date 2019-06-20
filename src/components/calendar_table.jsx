import React, { useState, useEffect } from 'react';
import Airtable from 'airtable';
const base = new Airtable({ apiKey: 'keyCxnlep0bgotSrX' }).base('appN1J6yscNwlzbzq');

function CalendarTable({ selectedClient }) {
  const [calendars, setCalendars] = useState([]);

  // Similar to componentDidMount and componentDidUpdate
  useEffect(() => {

    base('Calendars').select({
      filterByFormula: `{client}='${selectedClient.fields['Limeade e=']}'`
    }).eachPage((records, fetchNextPage) => {
      setCalendars([...calendars, ...records]);

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

  }, []); // Pass empty array to only run once on mount

  function editCalendar(calendar) {
    window.open(
      `https://calendarbuilder.dev.adurolife.com/calendar-builder/#/${calendar.fields['hash']}`,
      '_blank'
    );
  }

  function uploadCalendar(calendar) {
    window.open(
      `https://calendarbuilder.dev.adurolife.com/shiny-stone/compile/index.html#?calendar=${calendar.fields['hash']}`,
      '_blank'
    );
  }

  function openDeleteConfirmModal(calendarToDelete) {
    /* global $ */
    $('#confirm-modal').modal();
    $('.modal-body').html('<p>Are you sure you want to delete this calendar?</p>');
    $('.modal-footer .btn-danger').off('click');
    $('.modal-footer .btn-danger').click(() => {
      deleteCalendar(calendarToDelete);
    });
  }

  function deleteCalendar(calendarToDelete) {
    base('Calendars').destroy(calendarToDelete.id, (err, deletedRecord) => {
      if (err) {
        console.error(err);
        return;
      }

      // Hide the ConfirmModal
      $('#confirm-modal').modal('hide');

      // Remove calendar from view
      let updatedCalendars = calendars.filter(calendar => calendar.id !== deletedRecord.id);
      setCalendars(updatedCalendars);

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

  function renderRow(calendar) {
    return (
      <tr key={calendar.id}>
        <td>{calendar.fields['name']}</td>
        <td>{calendar.fields['year']}</td>
        <td>{calendar.fields['updated']}</td>
        <td>{calendar.fields['status']}</td>
        <td>
          <img onClick={() => editCalendar(calendar)} className="edit-icon" src="images/icon_edit.svg" />

          <img className="share-icon"
            type="image"
            src="images/icon_link.svg"
            data-toggle="tooltip"
            data-placement="bottom"
            title={`<h5 class='my-3'>Link to this Calendar</h5><h5 class='my-3'>https://calendarbuilder.dev.adurolife.com/calendar-builder/#/${calendar.fields['hash']}</h5>`} />

          <img onClick={() => uploadCalendar(calendar)} className="upload-icon" src="images/icon_upload.svg" />
          <img onClick={() => openDeleteConfirmModal(calendar)} className="delete-icon" src="images/icon_delete.svg" />
        </td>
      </tr>
    );
  }

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
        {calendars.map(calendar => renderRow(calendar))}
      </tbody>
    </table>
  );
}

export default CalendarTable;
