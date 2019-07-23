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

  // make the .csv file
  function createCsv(challenges) {
    console.log('createCsv began', challenges);

    // get the year for the copyright
    const currentYear = new Date().getFullYear();

    // sanitization. Still needed?
    const sanitize = (code) => {
    var sanitized = code
      .replace(/\r?\n|\r/g, ' ')     // Strip out carriage returns and newlines
      .replace(/,/g, '&comma;')      // Escape commas since we're using a csv
      .replace(/\u2018/g, '\'')      // Left single quote
      .replace(/\u2019/g, '\'')      // Right single quote
      .replace(/\u201C/g, '"')       // Left double quote
      .replace(/\u201D/g, '"')       // Right double quote
      .replace(/\u2026/g, '...')     // Ellipsis
      .replace(/\u2013/g, '&ndash;') // Long dash
      .replace(/\u2014/g, '&mdash;') // Longer dash
      .replace(/\u00A9/g, '&copy;')  // Copyright symbol
      .replace(/#fff/gi, 'white')    // For hash issues in our URIs
      .replace(/#cccccc/gi, 'silver')
      .replace(/copyright\s*\d+/gi, `Copyright ${currentYear}`);
    return sanitized;
    };

    // Convert tracking backend values to Limeade values
    const tracking = (trackType) => {
      switch (trackType) {
        case 'Event':
          return 'OneTimeEvent';
        case 'Days':
          return 'YesNoDaily';
        case 'Units':
          return 'AddAllNumbers';

        default:
          throw new Error('Tracking type is not one of the 3 valid values. (event/days/units)');
      }

    };

    var data = [[
      'EmployerName',
      'ChallengeId',
      'ChallengeType',
      'IsWeekly',
      'WinStrategy',
      'Target',
      'Activity',
      'ChallengeName',
      'DisplayPriority',
      'StartDate',
      'EndDate',
      'ShortDescription',
      'MoreInformation',
      'ImageUrl',
      'ShowInProgram',
      'RewardType',
      'Reward',
      'Dimensions',
      'LeaderboardTag',
      'EnableDeviceTracking',
      'AllowSelfReporting',
      'DeviceTrackingUnits',
      'IsTeamChallenge',
      'MinTeamSize',
      'MaxTeamSize',
      'Subgroup',
      'Field1',
      'Field1Value',
      'Field2',
      'Field2Value',
      'Field3',
      'Field3Value',
      'AppearanceInProgram',
      'IntegrationPartnerId',
      'ButtonText',
      'TargetUrl',
      'EventCode',
      'ShowExtendedDescription',
      'ActivityTemplateId',
      'IsFeatured',
      'FeaturedDescription',
      'FeaturedImageUrl'
    ]];

    console.log('pineapple', challenges);

    // Use the Library base in airtable
    const theLibraryBase = new Airtable({ apiKey: 'keyCxnlep0bgotSrX' }).base('appa7mnDuYdgwx2zP');

    challenges.map(challenge => {
      console.log('.map began');
      const trackingType = challenge.fields['Activity Tracking Type'];
      const challengeType = tracking(trackingType);
      const winStrategy = trackingType === 'Event' ? 'AccomplishOneTimeEvent' : 'MeetOrExceedTarget';
      const target = challenge.fields['Activity Goal'];
      const isWeekly = challenge.fields['Reward Occurrence'] === 'Weekly' ? 1 : 0;
      const enableDeviceTracking = challenge.fields['Activity Tracking Type'] === 'yes' ? 1 : 0;
      const activity = challenge.fields['Activity Goal Text'];
      
      // TODO: Get image working rather than getting the data after the file has been downloaded
      // Get the image URL from the Library
      let imageUrl = '';
      if (challenge.fields['Challenge Id']) {
        theLibraryBase('Challenges').find(challenge.fields['Challenge Id'], function(err, record) {
        if (err) {
          console.error(err);
          return;
        }
        imageUrl = record.fields['Limeade Image Url'];
        console.log(imageUrl);
        return imageUrl;
          });
        }

        const deviceTrackingUnits = enableDeviceTracking ? challenge.fields['Device Units'] : '';
        const isTeamChallenge = challenge.fields['Team Activity'] === 'yes' ? 1 : 0;
        
        // partner variables
        const isPartner =  challenge.fields['Verified'] === 'System Awarded' ? true : false;
        const allowSelfReporting = isPartner ? 0 : 1;
        const integrationPartnerId = isPartner ? 1 : '';
        const buttonText = isPartner ? 'CLOSE' : '';
        const targetUrl = isPartner ? '/Home?sametab=true' : '';
        const showExtendedDescription = isPartner ? 1 : '';



        data.push([
          // "record" is the Library version
          challenge.fields['EmployerName'], // client
          '', // ChallengeId
          challengeType,
          isWeekly,
          winStrategy,
          target,
          activity,
          '"' + challenge.fields['Title'] + '"', // title
          '', // DisplayPriority
          challenge.fields['Start date'], // start date
          challenge.fields['End date'], // end date
          sanitize(challenge.fields['Instructions']), // instructions
          sanitize(challenge.fields['More Information Html']), // More Information Html
          imageUrl, // Limeade image URL
          '0', // ShowInProgram
          '0', // RewardType
          challenge.fields['Points'], // points
          '', // dimensions
          '', // LeaderboardTag
          enableDeviceTracking,
          allowSelfReporting,
          deviceTrackingUnits,
          isTeamChallenge,
          isTeamChallenge ? challenge.fields['Team Size Minimum'] : '', // team min
          isTeamChallenge ? challenge.fields['Team Size Maximum'] : '', // team max
          '', // targeting: subgroup
          '', // targeting: field1name
          '', // targeting: field1value
          '', // targeting: field2name
          '', // targeting: field2value
          '', // targeting: field3name
          '', // targeting: field3value
          'Default', // AppearanceInProgram
          integrationPartnerId,
          buttonText,
          targetUrl,
          '', // EventCode
          showExtendedDescription,
          '', // ActivityTemplateId
          '0', // IsFeatured TODO: Add featured toggle functionality
          '', // FeaturedDescription
          '' // FeaturedImageUrl
        ]);


    })
    return data;

  }

  function compileTransporter(calendar) {
    'use strict';

    // get the year for the copyright
    const currentYear = new Date().getFullYear();

    var data = createCsv(calendar);
    console.log('compileTransporter began', data);
    var csvContent = '';
    data.forEach(function (infoArray, index) {
      var dataString = infoArray.join(',');
      csvContent += index < (data.length - 1) ? dataString + '\n' : dataString;
    });

    // TODO: update filename generation to be more accurate
    var file = encodeURI('data:text/csv;charset=utf-8,' + csvContent);
    var filename = `${selectedClient.fields['Limeade e=']}-${selectedClient.fields['Account Name']}.csv`;

    var link = document.createElement('a');
    link.setAttribute('download', filename);
    link.setAttribute('href', file);
    link.click();

  }

  function downloadCsv(calendar) {
    console.log('downloadCsv began', calendar);

    // pull in the Challenges base
    base('Challenges').select({
      filterByFormula: `{Calendar}='${calendar.fields['hash']}'`
    }).eachPage((records, fetchNextPage) => {
      const filteredRecords = records.filter((record) => {
        // keeping the filtering code so this only returns Transporter-uploadable challenges
        return record.fields['Verified'] === 'Self-Report' || record.fields['Verified'] === 'Points Upload';
      });
      console.log('paging');
      compileTransporter(filteredRecords);
      fetchNextPage();
    }, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
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
