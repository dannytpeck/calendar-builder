import React, { useState, useEffect } from 'react';
import moment from 'moment';
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

  function downloadCsv(calendarToDownload) {
    // TODO: write .csv download code

  }

  function openConfirmUploadModal(calendar) {
    $('#confirm-upload-modal').modal();

    base('Challenges').select({
      filterByFormula: `{Calendar}='${calendar.fields['hash']}'`
    }).eachPage((records, fetchNextPage) => {
      const filteredRecords = records.filter((record) => {
        return record.fields['Verified'] === 'Self-Report' || record.fields['Verified'] === 'Points Upload';
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
    // Use the Library base in airtable
    const theLibraryBase = new Airtable({ apiKey: 'keyCxnlep0bgotSrX' }).base('appa7mnDuYdgwx2zP');

    console.log(challenges);

    challenges.map(challenge => {

      // Get Library details for the challenge
      if (challenge.fields['Challenge Id']) {
        theLibraryBase('Challenges').find(challenge.fields['Challenge Id'], function(err, record) {
          if (err) {
            console.error(err);
            return;
          }

          let challengeType, frequency;
          switch (record.fields['Activity Tracking Type']) {
            case 'Event':
              challengeType = 'OneTimeEvent';
              frequency = 'None';
              break;
            case 'Days':
              challengeType = 'YesNoDaily';
              frequency = record.fields['Reward Occurrence'] === 'Weekly' ? 'Weekly' : 'Daily';
              break;
            case 'Units':
              challengeType = 'AddAllNumbers';
              frequency = record.fields['Reward Occurrence'] === 'Weekly' ? 'Weekly' : 'Daily';
              break;
          }

          const isDeviceEnabled = record.fields['Device Enabled'] === 'yes';
          const isTeamChallenge = record.fields['Team Activity'] === 'yes';

          // "record" is the Library version
          const data = {
            'AboutChallenge': record.fields['More Information Html'],
            'ActivityReward': {
              'Type': 'IncentivePoints',
              'Value': challenge.fields['Points']
            },
            'ActivityType': record.fields['Activity Goal Text'],
            'AmountUnit': isDeviceEnabled ? record.fields['Device Units'] : 'times',
            'ChallengeLogoURL': record.fields['Limeade Image Url'],
            'ChallengeLogoThumbURL': record.fields['Limeade Image Url'],
            'ChallengeTarget': record.fields['Activity Goal'],
            'ChallengeType': challengeType,
            'Dimensions': record.fields['Limeade Dimensions'].split(','),
            'DisplayInProgram': true,
            'DisplayPriority': 0,
            'EndDate': challenge.fields['End Date'],
            'Frequency': frequency,
            'IsDeviceEnabled': isDeviceEnabled,
            'IsFeatured': null,
            'IsSelfReportEnabled': true,
            'IsTeamChallenge': isTeamChallenge,
            'Name': record.fields['Title'],
            'ShortDescription': record.fields['Instructions'],
            'ShowWeeklyCalendar': false,
            'StartDate': challenge.fields['Start Date'],
            'TeamSize': isTeamChallenge ? { maxTeamSize: record.fields['Team Size Maximum'], minTeamSize: record.fields['Team Size Minimum'] } : null
          };

          console.log(data);

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

        });
      }

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
        <td>{moment(calendar.fields['updated']).format('L')}</td>
        <td>{moment(calendar.fields['approved']).format('L')}</td>
        <td>{calendar.fields['status']}</td>
        <td>
          <img onClick={() => editCalendar(calendar)} className="table-icon edit-icon" title="Edit Calendar" src="images/icon_edit.svg" />

          <img className="table-icon share-icon"
            type="image"
            src="images/icon_link.svg"
            data-toggle="tooltip"
            data-placement="bottom"
            title={`<h5 class='my-3'>Link to this Calendar</h5><h5 class='my-3'>https://calendarbuilder.dev.adurolife.com/calendar-builder/#/${calendar.fields['hash']}</h5>`} />

          <img onClick={() => downloadCsv(calendar)} className="table-icon download-icon" title="Download Calendar as .CSV" src="images/icon_download.svg" />
          <img onClick={() => openConfirmUploadModal(calendar)} className="table-icon upload-icon" title="Upload Calendar to Limeade" src="images/icon_upload.svg" />
          <img onClick={() => openDeleteConfirmModal(calendar)} className="table-icon delete-icon" title="Delete Calendar" src="images/icon_delete.svg" />
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
