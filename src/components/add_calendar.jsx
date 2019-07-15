import React from 'react';
import moment from 'moment';
import crypto from 'crypto';
import Airtable from 'airtable';
const base = new Airtable({ apiKey: 'keyCxnlep0bgotSrX' }).base('appN1J6yscNwlzbzq');

import Header from './header';
import ClientName from './client_name';

function AddCalendar({ selectedClient, handleCancelClick, handleNextClick }) {
  const [template, setTemplate] = React.useState(null);
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [oneTimePoints, setOneTimePoints] = React.useState(null);
  const [weeklyPoints, setWeeklyPoints] = React.useState(null);
  const [teamPoints, setTeamPoints] = React.useState(null);
  const [calendar, setCalendar] = React.useState(null);

  function validateFields() {
    /* globals $ */
    const $startDate = $('#startDate');
    const $endDate = $('#endDate');
    const $oneTimePoints = $('#oneTimePoints');
    const $weeklyPoints = $('#weeklyPoints');
    const $teamPoints = $('#teamPoints');

    let allInputsAreValid = true;

    function validate($element) {
      if ($element.val()) {
        $element.removeClass('is-invalid');
      } else {
        $element.addClass('is-invalid');
        allInputsAreValid = false;
      }
    }

    validate($startDate);
    validate($endDate);
    validate($oneTimePoints);
    validate($weeklyPoints);
    validate($teamPoints);

    return allInputsAreValid;
  }

  function createCalendar(records) {
    const phase1start = startDate;

    // Phase 1 is 13 weeks
    const phase1end = moment(phase1start).add(90, 'days').format('YYYY-MM-DD');
    const phase2start = moment(phase1end).add(1, 'days').format('YYYY-MM-DD');

    // Phase 2 is 12 weeks
    const phase2end = moment(phase2start).add(83, 'days').format('YYYY-MM-DD');
    const phase3start = moment(phase2end).add(1, 'days').format('YYYY-MM-DD');

    // Phase 3 is 13 weeks
    const phase3end = moment(phase3start).add(90, 'days').format('YYYY-MM-DD');
    const phase4start = moment(phase3end).add(1, 'days').format('YYYY-MM-DD');

    const phase4end = endDate;

    const employerName = selectedClient.fields['Limeade e='];
    const programYearStart = moment(startDate).format('YYYY');
    const programYearEnd = moment(endDate).format('YYYY');
    const programYear = programYearStart === programYearEnd ?
      programYearStart :
      programYearStart + '-' + programYearEnd;

    const hash = crypto.randomBytes(14).toString('hex').slice(0, 14);

    // Create the calendar in airtable
    base('Calendars').create({
      hash: hash,
      name: 'Calendar_' + programYear,
      client: employerName,
      year: programYear,
      updated: moment().format('L'),
      status: 'In Progress',
      'Yearlong Start Date': startDate,
      'Yearlong End Date': endDate,
      'Phase 1 Start Date': phase1start,
      'Phase 1 End Date': phase1end,
      'Phase 2 Start Date': phase2start,
      'Phase 2 End Date': phase2end,
      'Phase 3 Start Date': phase3start,
      'Phase 3 End Date': phase3end,
      'Phase 4 Start Date': phase4start,
      'Phase 4 End Date': endDate
    }, (err, record) => {
      if (err) {
        console.error(err);
        return;
      }

      // Return to Show Calendars view
      handleNextClick();
    });

    // Create all the challenges in airtable
    records.map(record => {

      // Add important fields for calendar matching
      record.fields['EmployerName'] = employerName;
      record.fields['Calendar'] = hash;

      // Update phase dates based on user input
      switch (record.fields['Phase']) {
        case 'Yearlong':
          record.fields['Start date'] = startDate;
          record.fields['End date'] = endDate;
          break;
        case 'Phase 1':
          record.fields['Start date'] = phase1start;
          record.fields['End date'] = phase1end;
          break;
        case 'Phase 2':
          record.fields['Start date'] = phase2start;
          record.fields['End date'] = phase2end;
          break;
        case 'Phase 3':
          record.fields['Start date'] = phase3start;
          record.fields['End date'] = phase3end;
          break;
        case 'Phase 4':
          record.fields['Start date'] = phase4start;
          record.fields['End date'] = phase4end;
          break;
      }

      // Update point values based on user input
      record.fields['Points'] = oneTimePoints;
      if (record.fields['Verified'] === 'Self-Report') {
        if (record.fields['Team Activity'] === 'Yes') {
          record.fields['Points'] = teamPoints;
        }
        if (record.fields['Reward Occurrence'] === 'Weekly') {
          record.fields['Points'] = weeklyPoints;
        }
      }

      // Save the record to Airtable
      base('Challenges').create(record.fields, (err, record) => {
        if (err) {
          console.error(err);
          return;
        }
      });

    });

    return { employerName, programYear };
  }

  function submitCalendar(e) {
    const validated = validateFields();

    if (validated) {
      let table;

      switch (template) {
        case '2020 Calendar':
          table = 'Template 2020';
          break;
        case '2019 Calendar':
          table = 'Templates';
          break;
        default:
          table = 'Empty Calendar';
          break;
      }

      base(table).select({
        view: 'Default'
      }).eachPage((records, fetchNextPage) => {

        createCalendar(records);

        fetchNextPage();
      }, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
    }

  }

  function handleChangeTemplate(e) {
    setTemplate(e.target.value);
  }

  function handleChangeStartDate(e) {
    const date = moment(e.target.value).format('YYYY-MM-DD');
    setStartDate(date);
  }

  function handleChangeEndDate(e) {
    const date = moment(e.target.value).format('YYYY-MM-DD');
    setEndDate(date);
  }

  function handleChangeOneTimePoints(e) {
    setOneTimePoints(e.target.value);
  }

  function handleChangeWeeklyPoints(e) {
    setWeeklyPoints(e.target.value);
  }

  function handleChangeTeamPoints(e) {
    setTeamPoints(e.target.value);
  }

  return (
    <div className="add-calendar">
      <Header />
      <h2>Create New Calendar</h2>
      <ClientName selectedClient={selectedClient} />

      <div className="select-template my-5">
        <h5>Select Template:</h5>
        <select id="template" className="form-control" onChange={handleChangeTemplate}>
          <option>None</option>
          <option>2020 Calendar</option>
          <option>2019 Calendar</option>
        </select>
      </div>

      <div className="program-dates my-5">
        <h5>Program Dates:</h5>
        <span>Start Date:</span><input id="startDate" className="form-control" type="date" onChange={handleChangeStartDate} />
        <span>End Date:</span><input id="endDate" className="form-control" type="date" onChange={handleChangeEndDate} />
      </div>

      <div className="point-structure my-5">
        <h5 className="my-4">Point Structure:</h5>
        <p>
          <span>One-Time Challenge:</span>
          <input id="oneTimePoints" className="form-control" type="text" onChange={handleChangeOneTimePoints} />
          <span>points</span>
        </p>
        <p>
          <span>Weekly Challenges:</span>
          <input id="weeklyPoints" className="form-control" type="text" onChange={handleChangeWeeklyPoints} />
          <span>points</span>
        </p>
        <p>
          <span>Team Challenge:</span>
          <input id="teamPoints" className="form-control" type="text" onChange={handleChangeTeamPoints} />
          <span>points</span>
        </p>
      </div>

      <div className="buttons my-5">
        <span className="cancel-button" onClick={handleCancelClick}>Cancel</span>
        <button className="btn btn-primary next-button" onClick={submitCalendar}>Create Calendar</button>
      </div>

    </div>
  );
}

export default AddCalendar;
