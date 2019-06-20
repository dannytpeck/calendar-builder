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
    const phase1bstart = moment(phase1start).add(21, 'days').format('YYYY-MM-DD');
    const phase1end = moment(phase1start).add(90, 'days').format('YYYY-MM-DD');
    const phase2start = moment(phase1end).add(1, 'days').format('YYYY-MM-DD');
    const phase2bstart = moment(phase2start).add(21, 'days').format('YYYY-MM-DD');
    const phase2end = moment(phase2start).add(83, 'days').format('YYYY-MM-DD');
    const phase3start = moment(phase2end).add(1, 'days').format('YYYY-MM-DD');
    const phase3bstart = moment(phase3start).add(28, 'days').format('YYYY-MM-DD');
    const phase3end = moment(phase3start).add(90, 'days').format('YYYY-MM-DD');
    const phase4start = moment(phase3end).add(1, 'days').format('YYYY-MM-DD');
    const phase4bstart = moment(phase4start).add(21, 'days').format('YYYY-MM-DD');
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
      status: 'In Progress'
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
        case 'Phase 1B':
          record.fields['Start date'] = phase1bstart;
          record.fields['End date'] = phase1end;
          break;
        case 'Phase 2':
          record.fields['Start date'] = phase2start;
          record.fields['End date'] = phase2end;
          break;
        case 'Phase 2B':
          record.fields['Start date'] = phase2bstart;
          record.fields['End date'] = phase2end;
          break;
        case 'Phase 3':
          record.fields['Start date'] = phase3start;
          record.fields['End date'] = phase3end;
          break;
        case 'Phase 3B':
          record.fields['Start date'] = phase3bstart;
          record.fields['End date'] = phase3end;
          break;
        case 'Phase 4':
          record.fields['Start date'] = phase4start;
          record.fields['End date'] = phase4end;
          break;
        case 'Phase 4B':
          record.fields['Start date'] = phase4bstart;
          record.fields['End date'] = phase4end;
          break;
      }

      // Update point values based on user input
      const teamActivity = record.fields['Team Activity'];
      const rewardOccurrence = record.fields['Reward Occurrence'];
      const verified = record.fields['Verified'] === 'Verified';

      if (!verified) {
        if (teamActivity === 'yes') {
          record.fields['Points'] = teamPoints;
        } else {
          if (rewardOccurrence === 'Once') {
            record.fields['Points'] = oneTimePoints;
          } else if (rewardOccurrence === 'Weekly') {
            record.fields['Points'] = weeklyPoints;
          }
        }
      }

      // Save the record to Airtable
      record.fields['EmployerName'] = employerName;
      record.fields['Program Year'] = programYear;
      record.fields['Calendar'] = hash;

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
        case 'HP 2019 Calendar':
          table = 'Templates';
          break;
        case 'HP 2018 Calendar':
          table = 'Templates 2018';
          break;
        default:
          table = 'EmptyCalendar';
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
          <option>HP 2019 Calendar</option>
          <option>HP 2018 Calendar</option>
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
        <button className="btn btn-primary next-button" onClick={submitCalendar}>Next</button>
      </div>

    </div>
  );
}

export default AddCalendar;
