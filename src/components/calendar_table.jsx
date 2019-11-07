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
      `https://calendarbuilder.dev.adurolife.com/calendar-builder/#/${calendar.fields['hash']}`,
      '_blank'
    );
  }

  // make the .csv file
  function createCsv(challenges) {
    // get the year for the copyright
    const currentYear = new Date().getFullYear();

    // sanitization. Still needed?
    const sanitize = (code) => {
    let sanitized = code
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
      .replace(/#0080a5/gi, 'steelblue')
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
        // adding an undefined case to handle placeholders that are missing a tracking type
        case undefined:
          return 'Event';

        default:
          throw new Error('Tracking type is not one of the 3 valid values. (event/days/units)');
      }

    };

    let data = [[
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

    challenges.map(challenge => {
      const trackingType = challenge.fields['Activity Tracking Type'];
      const challengeType = tracking(trackingType);
      const winStrategy = trackingType === 'Event' ? 'AccomplishOneTimeEvent' : 'MeetOrExceedTarget';
      const target = challenge.fields['Activity Goal'];
      const isWeekly = challenge.fields['Reward Occurrence'] === 'Weekly' ? 1 : 0;
      const enableDeviceTracking = (challenge.fields['Device Enabled'] === 'yes' || challenge.fields['Device Enabled'] === 'Yes') ? 1 : 0;
      const activity = challenge.fields['Activity Goal Text'];
      const imageUrl = challenge.fields['Limeade Image Url'] ? challenge.fields['Limeade Image Url'] : '';
      const deviceTrackingUnits = enableDeviceTracking ? challenge.fields['Device Units'] : '';
      const isTeamChallenge = challenge.fields['Team Activity'] === 'yes' ? 1 : 0;

      // partner variables
      const isPartner =  challenge.fields['Verified'] === 'Points Upload' ? true : false;
      const allowSelfReporting = isPartner ? 0 : 1;
      const integrationPartnerId = isPartner ? 1 : '';
      const buttonText = isPartner ? 'CLOSE' : '';
      const targetUrl = isPartner ? '/Home?sametab=true' : '';
      const showExtendedDescription = isPartner ? 1 : '';

      // featured variables
      const isFeatured = challenge.fields['Featured Activity'] === 'yes' ? 1 : 0;
      const featuredDescription = isFeatured === 1 ? challenge.fields['Instructions'] : '';
      const featuredImageUrl = isFeatured === 1 ? imageUrl : '';

      data.push([
        // "record" is the Library version
        challenge.fields['EmployerName'], // client
        '', // ChallengeId
        challengeType,
        isWeekly,
        winStrategy,
        target,
        '"' + activity + '"',
        '"' + challenge.fields['Title'] + '"', // title
        '', // DisplayPriority
        challenge.fields['Start date'], // start date
        challenge.fields['End date'], // end date
        challenge.fields['Instructions'] ? sanitize(challenge.fields['Instructions']) : '', // instructions
        challenge.fields['More Information Html'] ? sanitize(challenge.fields['More Information Html']) : '', // More Information Html
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
        isTeamChallenge ? challenge.fields['Team Size Minimum'] : '',
        isTeamChallenge ? challenge.fields['Team Size Maximum'] : '',
        challenge.fields['Subgroup'],
        challenge.fields['Targeting Column 1'],
        challenge.fields['Targeting Value 1'],
        challenge.fields['Targeting Column 2'],
        challenge.fields['Targeting Value 2'],
        challenge.fields['Targeting Column 3'],
        challenge.fields['Targeting Value 3'],
        'Default', // AppearanceInProgram
        integrationPartnerId,
        buttonText,
        targetUrl,
        '', // EventCode
        showExtendedDescription,
        '', // ActivityTemplateId
        isFeatured, // IsFeatured
        '"' + featuredDescription + '"', // FeaturedDescription
        featuredImageUrl // FeaturedImageUrl
      ]);

    });
    return data;

  }

  function compileTransporter(challenges) {
    const data = createCsv(challenges);
    let csvContent = '';
    data.forEach((infoArray, index) => {
      const dataString = infoArray.join();
      csvContent += index < (data.length - 1) ? dataString + '\n' : dataString;
    });

    // get the year for the filename
    const currentYear = new Date().getFullYear();

    // Create calendar name for the filename
    let calendarName = currentYear;
    if (challenges[0].fields['Calendar']) {
      calendarName = calendars.filter(calendar => {
        return calendar.fields['hash'] === challenges[0].fields['Calendar'];
      })[0].fields['name'];
    }

    const filename = `${selectedClient.fields['Limeade e=']}-${calendarName}.csv`;
    const csvData = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(csvData);

    // create the download link
    let link = document.createElement('a');
    link.setAttribute('download', filename);
    link.setAttribute('href', url);
    link.click();

  }

  // downloads all Self-Report and Points Upload from the calendar, including template at custom
  function downloadAllCsv(calendar) {
    let filteredRecords = [];
    let url = 'https://api.airtable.com/v0/appN1J6yscNwlzbzq/Challenges?api_key=keylwZtbvFbcT3sgw';
    $.getJSON(`${url}&filterByFormula={Calendar}='${calendar.fields['hash']}'`).done(data => {
      filteredRecords = [...filteredRecords, ...data.records];

      if (data.offset) {
        $.getJSON(`${url}&filterByFormula={Calendar}='${calendar.fields['hash']}'&offset=${data.offset}`).done(data => {
          filteredRecords = [...filteredRecords, ...data.records];
          filteredRecords = filteredRecords.filter(record => {
            return record.fields['Verified'] === 'Self-Report' || record.fields['Verified'] === 'Points Upload';
          });
          compileTransporter(filteredRecords);
        });
      } else {
        filteredRecords = filteredRecords.filter(record => {
          return record.fields['Verified'] === 'Self-Report' || record.fields['Verified'] === 'Points Upload';
        });
        compileTransporter(filteredRecords);
      }

    });
  }

  // downloads template Self-Report and Points Upload from the calendar
  function downloadTemplateCsv(calendar) {
    let filteredRecords = [];
    let url = 'https://api.airtable.com/v0/appN1J6yscNwlzbzq/Challenges?api_key=keylwZtbvFbcT3sgw';
    $.getJSON(`${url}&filterByFormula={Calendar}='${calendar.fields['hash']}'`).done(data => {
      filteredRecords = [...filteredRecords, ...data.records];

      if (data.offset) {
        $.getJSON(`${url}&filterByFormula={Calendar}='${calendar.fields['hash']}'&offset=${data.offset}`).done(data => {
          filteredRecords = [...filteredRecords, ...data.records];
          filteredRecords = filteredRecords.filter(record => {
            return record.fields['Verified'] === 'Self-Report' || record.fields['Verified'] === 'Points Upload';
          });
          // filter out the custom challenges
          filteredRecords = filteredRecords.filter(record => {
            return record.fields['Custom Tile Type'] === '' || record.fields['Custom Tile Type'] === null || record.fields['Custom Tile Type'] === undefined;
          });
          compileTransporter(filteredRecords);
        });
      } else {
        filteredRecords = filteredRecords.filter(record => {
          return record.fields['Verified'] === 'Self-Report' || record.fields['Verified'] === 'Points Upload';
        });
        // filter out the custom challenges
        filteredRecords = filteredRecords.filter(record => {
          return record.fields['Custom Tile Type'] === '' || record.fields['Custom Tile Type'] === null || record.fields['Custom Tile Type'] === undefined;
        });
        compileTransporter(filteredRecords);
      }

    });
  }

  // downloads custom Self-Report and Points Upload from the calendar
  function downloadCustomCsv(calendar) {
    let filteredRecords = [];
    let url = 'https://api.airtable.com/v0/appN1J6yscNwlzbzq/Challenges?api_key=keylwZtbvFbcT3sgw';
    $.getJSON(`${url}&filterByFormula={Calendar}='${calendar.fields['hash']}'`).done(data => {
      filteredRecords = [...filteredRecords, ...data.records];

      if (data.offset) {
        $.getJSON(`${url}&filterByFormula={Calendar}='${calendar.fields['hash']}'&offset=${data.offset}`).done(data => {
          filteredRecords = [...filteredRecords, ...data.records];
          filteredRecords = filteredRecords.filter(record => {
            return record.fields['Verified'] === 'Self-Report' || record.fields['Verified'] === 'Points Upload';
          });
          // filter out the template challenges
          filteredRecords = filteredRecords.filter(record => {
            return record.fields['Custom Tile Type'] === 'Net New' || record.fields['Custom Tile Type'] === 'Rerun' || record.fields['Custom Tile Type'] === 'Revised';
          });
          compileTransporter(filteredRecords);
        });
      } else {
        filteredRecords = filteredRecords.filter(record => {
          return record.fields['Verified'] === 'Self-Report' || record.fields['Verified'] === 'Points Upload';
        });
        // filter out the template challenges
        filteredRecords = filteredRecords.filter(record => {
          return record.fields['Custom Tile Type'] === 'Net New' || record.fields['Custom Tile Type'] === 'Rerun' || record.fields['Custom Tile Type'] === 'Revised';
        });
        compileTransporter(filteredRecords);
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
        <p><a href="https://calendarbuilder.dev.adurolife.com/calendar-builder/#/2f7e5003375688" target="_blank">${calendar.fields['name']}</a></p>
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

    challenges.map(challenge => {
      if (challenge.fields['Verified'] !== 'System Awarded') {
        let challengeType, frequency;
        switch (challenge.fields['Activity Tracking Type']) {
          case 'Event':
            challengeType = 'OneTimeEvent';
            frequency = 'None';
            break;
          case 'Days':
            challengeType = 'YesNoDaily';
            frequency = challenge.fields['Reward Occurrence'] === 'Weekly' ? 'Weekly' : 'Daily';
            break;
          case 'Units':
            challengeType = 'AddAllNumbers';
            frequency = challenge.fields['Reward Occurrence'] === 'Weekly' ? 'Weekly' : 'Daily';
            break;
        }

        const isDeviceEnabled = challenge.fields['Device Enabled'] === 'yes';
        const isTeamChallenge = challenge.fields['Team Activity'] === 'yes';

        // TODO: Update upload for Targeting information, featured, verified/partner challenges
        const data = {
          'AboutChallenge': challenge.fields['More Information Html'],
          'ActivityReward': {
            'Type': 'IncentivePoints',
            'Value': challenge.fields['Points']
          },
          'ActivityType': challenge.fields['Activity Goal Text'],
          'AmountUnit': isDeviceEnabled ? challenge.fields['Device Units'] : 'times',
          'ChallengeLogoURL': challenge.fields['Limeade Image Url'],
          'ChallengeLogoThumbURL': challenge.fields['Limeade Image Url'],
          'ChallengeTarget': challenge.fields['Activity Goal'],
          'ChallengeType': challengeType,
          'Dimensions': challenge.fields['Limeade Dimensions'][0] !== 'NA' ? challenge.fields['Limeade Dimensions'].toString().split(',') : '',
          'DisplayInProgram': true,
          'DisplayPriority': 0,
          'EndDate': challenge.fields['End date'],
          'Frequency': frequency,
          'IsDeviceEnabled': isDeviceEnabled,
          'IsFeatured': null,
          'IsSelfReportEnabled': true,
          'IsTeamChallenge': isTeamChallenge,
          'Name': challenge.fields['Title'],
          'ShortDescription': challenge.fields['Instructions'],
          'ShowWeeklyCalendar': false,
          'StartDate': challenge.fields['Start date'],
          'TeamSize': isTeamChallenge ? { maxTeamSize: challenge.fields['Team Size Maximum'], minTeamSize: challenge.fields['Team Size Minimum'] } : null
        };

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
        <td className="calendar-name">{calendar.fields['name']}</td>
        <td>{calendar.fields['year']}</td>
        <td>{moment(calendar.fields['updated']).format('L')}</td>
        <td>{calendar.fields['approved'] ? moment(calendar.fields['approved']).format('L') : ''}</td>
        <td>{calendar.fields['status']}</td>
        <td>
          <img onClick={() => editCalendar(calendar)} className="table-icon edit-icon" title="Edit Calendar" src="images/icon_edit.svg" />
          <img onClick={() => downloadAllCsv(calendar)} className="table-icon download-icon" title="Download All Challenges from Calendar as .CSV" src="images/icon_download_all.svg" />
          <img onClick={() => downloadTemplateCsv(calendar)} className="table-icon download-icon" title="Download Template Challenges from Calendar as .CSV" src="images/icon_download_template.svg" />
          <img onClick={() => downloadCustomCsv(calendar)} className="table-icon download-icon" title="Download Custom Challenges from Calendar as .CSV" src="images/icon_download_custom.svg" />
          {/* Hiding the upload icon until we have the upload code
          <img onClick={() => openConfirmUploadModal(calendar)} className="table-icon upload-icon" title="Upload Calendar to Limeade" src="images/icon_upload.svg" />
          */}
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
