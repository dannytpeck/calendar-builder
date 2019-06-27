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
      `https://calendarbuilder.dev.adurolife.com/staging/calendar-builder/#/${calendar.fields['hash']}`,
      '_blank'
    );
  }

  function openConfirmUploadModal(calendar) {
    $('#confirm-upload-modal').modal();

    base('Challenges').select({
      filterByFormula: `{Calendar}='${calendar.fields['hash']}'`
    }).eachPage((records, fetchNextPage) => {
      const filteredRecords = records.filter((record) => {
        return record.fields['Tracking'] === 'Self-Report' || record.fields['Tracking'] === 'Points Upload';
      });

      $('#confirm-upload-modal .modal-body').html(`
        <p>Are you sure you want to upload this calendar to Limeade?</p>
        <p><a href="https://calendarbuilder.dev.adurolife.com/staging/calendar-builder/#/2f7e5003375688" target="_blank">${calendar.fields['name']}</a></p>
      `);

      $('#confirm-upload-modal .modal-footer .btn-primary').off('click');
      $('#confirm-upload-modal .modal-footer .btn-primary').click(() => {
        uploadCalendar(filteredRecords);
      });

      fetchNextPage();
    }, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
  }

  function uploadCalendar(challenges) {
    console.log(challenges);

    challenges.map(challenge => {
      // Upload each challenge to Limeade
      console.log(challenge);

      // TODO: determine ChallengeType based on data available i.e. AddAllNumbers, OneTimeEvent?, the third one
      // TODO: get limeade image from Library
      // TODO: get limeade dimensions from library

      // Reward Occurrence: "Once",
      // Team Activity: "no"

      const data = {
        'StartDate': challenge.fields['Start Date'],
        'EndDate': challenge.fields['End Date'],
        'Name': challenge.fields['Challenge Name'],
        'ChallengeType': 'AddAllNumbers',
        'ShowWeeklyCalendar': true,
        'Frequency': 'Daily',
        'ShortDescription': challenge.fields['Instructions'],
        'AmountUnit': challenge.fields['Activity Goal Text'],
        'IsSelfReportEnabled': true,
        'ChallengeLogoURL': 'https://d2qv7eqemtyl41.cloudfront.net/PDW/010879ab-08c2-468f-9d11-4c615062c690-large.jpg',
        'ChallengeLogoThumbURL': 'https://d2qv7eqemtyl41.cloudfront.net/PDW/010879ab-08c2-468f-9d11-4c615062c690-large.jpg',
        'ActivityReward': {
          'Type': 'IncentivePoints',
          'Value': challenge.fields['Points']
        },
        'Dimensions': [
          'Resilience'
        ],
        'DisplayPriority': 0,
        'DisplayInProgram': true
      };

      console.log(data);

      /*
      $.ajax({
        url: 'https://api.limeade.com/api/admin/activity',
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify(data),
        headers: {
          Authorization: 'Bearer ' + selectedClient.fields['LimeadeAccessToken']
        },
        contentType: 'application/json; charset=utf-8'
      }).done((result) => {

        console.log(result);

      }).fail((xhr, textStatus, error) => {
        console.error(xhr.responseText);
      });
      */

    });
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
        <td>{calendar.fields['approved']}</td>
        <td>{calendar.fields['status']}</td>
        <td>
          <img onClick={() => editCalendar(calendar)} className="edit-icon" src="images/icon_edit.svg" />

          <img className="share-icon"
            type="image"
            src="images/icon_link.svg"
            data-toggle="tooltip"
            data-placement="bottom"
            title={`<h5 class='my-3'>Link to this Calendar</h5><h5 class='my-3'>https://calendarbuilder.dev.adurolife.com/calendar-builder/#/${calendar.fields['hash']}</h5>`} />

          <img onClick={() => openConfirmUploadModal(calendar)} className="upload-icon" src="images/icon_upload.svg" />
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
          <th>Approval Date</th>
          <th>Status</th>
          <th id="actionsHeader">Actions</th>
        </tr>
      </thead>
      <tbody>
        {calendars.map(calendar => renderRow(calendar))}
      </tbody>
    </table>
  );
}

export default CalendarTable;
