import React from 'react';
import moment from 'moment';
import crypto from 'crypto';
import Airtable from 'airtable';
const base = new Airtable({ apiKey: 'keyCxnlep0bgotSrX' }).base('appN1J6yscNwlzbzq');

import Header from './header';
import ClientName from './client_name';

function AddCalendar({ selectedClient, handleCancelClick, handleNextClick }) {
  const [template, setTemplate] = React.useState(null);
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [phase1StartDate, setPhase1StartDate] = React.useState('');
  const [phase1EndDate, setPhase1EndDate] = React.useState('');
  const [phase2StartDate, setPhase2StartDate] = React.useState('');
  const [phase2EndDate, setPhase2EndDate] = React.useState('');
  const [phase3StartDate, setPhase3StartDate] = React.useState('');
  const [phase3EndDate, setPhase3EndDate] = React.useState('');
  const [phase4StartDate, setPhase4StartDate] = React.useState('');
  const [phase4EndDate, setPhase4EndDate] = React.useState('');
  const [oneTimePoints, setOneTimePoints] = React.useState(null);
  const [weeklyPoints, setWeeklyPoints] = React.useState(null);
  const [teamPoints, setTeamPoints] = React.useState(null);
  const [calendar, setCalendar] = React.useState(null);

  function validateFields() {
    /* globals $ */
    const $startDate = $('#startDate');
    const $endDate = $('#endDate');
    const $phase1StartDate = $('#phase1StartDate');
    const $phase1EndDate = $('#phase1EndDate');
    const $phase2StartDate = $('#phase2StartDate');
    const $phase2EndDate = $('#phase2EndDate');
    const $phase3StartDate = $('#phase3StartDate');
    const $phase3EndDate = $('#phase3EndDate');
    const $phase4StartDate = $('#phase4StartDate');
    const $phase4EndDate = $('#phase4EndDate');

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
    validate($phase1StartDate);
    validate($phase1EndDate);
    validate($phase2StartDate);
    validate($phase2EndDate);
    validate($phase3StartDate);
    validate($phase3EndDate);
    validate($phase4StartDate);
    validate($phase4EndDate);

    validate($oneTimePoints);
    validate($weeklyPoints);
    validate($teamPoints);

    return allInputsAreValid;
  }

  function createChallenges(records, hash) {
    const programYearStart = moment(startDate).format('YYYY');
    const programYearEnd = moment(endDate).format('YYYY');
    const programYear = programYearStart === programYearEnd ? programYearStart : programYearStart + '-' + programYearEnd;
    const employerName = selectedClient.fields['Limeade e='];

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
          record.fields['Start date'] = phase1StartDate;
          record.fields['End date'] = phase1EndDate;
          break;
        case 'Phase 2':
          record.fields['Start date'] = phase2StartDate;
          record.fields['End date'] = phase2EndDate;
          break;
        case 'Phase 3':
          record.fields['Start date'] = phase3StartDate;
          record.fields['End date'] = phase3EndDate;
          break;
        case 'Phase 4':
          record.fields['Start date'] = phase4StartDate;
          record.fields['End date'] = phase4EndDate;
          break;
      }

      // Update point values based on user input
      record.fields['Points'] = oneTimePoints;
      if (record.fields['Verified'] === 'Self-Report') {
        if (record.fields['Team Activity'] === 'yes') {
          record.fields['Points'] = teamPoints;
        }
        if (record.fields['Reward Occurrence'] === 'Weekly') {
          record.fields['Points'] = weeklyPoints;
        }
      }

      // Override points to 0 for Hot Topics on the Go! challenge
      if (record.fields['Title'] === 'Hot Topics On the Go!') {
        record.fields['Points'] = '0';
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

      const hash = crypto.randomBytes(14).toString('hex').slice(0, 14);
      const programYearStart = moment(startDate).format('YYYY');
      const programYearEnd = moment(endDate).format('YYYY');
      const programYear = programYearStart === programYearEnd ? programYearStart : programYearStart + '-' + programYearEnd;
      const employerName = selectedClient.fields['Limeade e='];

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
        'Phase 1 Start Date': phase1StartDate,
        'Phase 1 End Date': phase1EndDate,
        'Phase 2 Start Date': phase2StartDate,
        'Phase 2 End Date': phase2EndDate,
        'Phase 3 Start Date': phase3StartDate,
        'Phase 3 End Date': phase3EndDate,
        'Phase 4 Start Date': phase4StartDate,
        'Phase 4 End Date': phase4EndDate
      }, (err, record) => {
        if (err) {
          console.error(err);
          return;
        }

        // Return to Show Calendars view
        handleNextClick();
      });

      let table;

      switch (template) {
        case '2020 Calendar':
          table = 'Template 2020';
          break;
        case '2019 Calendar':
          table = 'Templates';
          break;
        case '2020 EA Medical Mutual Calendar':
          table = 'EA MM Template 2020';
          break;
        case '2020 HHP Full Outcomes Calendar':
          table = 'HHP Full Outcomes Template 2020';
          break;
        default:
          table = 'Empty Calendar';
          break;
      }
      console.log(table);

      base(table).select({
        view: 'Default'
      }).eachPage((records, fetchNextPage) => {

        createChallenges(records, hash);

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
    const newStartDate = moment(e.target.value).format('YYYY-MM-DD');
    setStartDate(newStartDate);

    // update phase dates
    updatePhaseDates(newStartDate, endDate);
  }

  function handleChangeEndDate(e) {
    const newEndDate = moment(e.target.value).format('YYYY-MM-DD');
    setEndDate(newEndDate);

    // update phase dates
    updatePhaseDates(startDate, newEndDate);
  }

  function updatePhaseDates(newStartDate, newEndDate) {
    // update phase dates
    const phase1start = newStartDate;

    // Phase 1 is 13 weeks
    const phase1end = moment(phase1start).add(90, 'days').format('YYYY-MM-DD');
    const phase2start = moment(phase1end).add(1, 'days').format('YYYY-MM-DD');

    // Phase 2 is 12 weeks
    const phase2end = moment(phase2start).add(83, 'days').format('YYYY-MM-DD');
    const phase3start = moment(phase2end).add(1, 'days').format('YYYY-MM-DD');

    // Phase 3 is 13 weeks
    const phase3end = moment(phase3start).add(90, 'days').format('YYYY-MM-DD');
    const phase4start = moment(phase3end).add(1, 'days').format('YYYY-MM-DD');

    const phase4end = newEndDate;

    setPhase1StartDate(phase1start);
    setPhase1EndDate(phase1end);
    setPhase2StartDate(phase2start);
    setPhase2EndDate(phase2end);
    setPhase3StartDate(phase3start);
    setPhase3EndDate(phase3end);
    setPhase4StartDate(phase4start);
    setPhase4EndDate(phase4end);
  }

  function handleChangePhase1Start(e) {
    const date = moment(e.target.value).format('YYYY-MM-DD');
    setPhase1StartDate(date);
  }

  function handleChangePhase1End(e) {
    const date = moment(e.target.value).format('YYYY-MM-DD');
    setPhase1EndDate(date);
  }

  function handleChangePhase2Start(e) {
    const date = moment(e.target.value).format('YYYY-MM-DD');
    setPhase2StartDate(date);
  }

  function handleChangePhase2End(e) {
    const date = moment(e.target.value).format('YYYY-MM-DD');
    setPhase2EndDate(date);
  }

  function handleChangePhase3Start(e) {
    const date = moment(e.target.value).format('YYYY-MM-DD');
    setPhase3StartDate(date);
  }

  function handleChangePhase3End(e) {
    const date = moment(e.target.value).format('YYYY-MM-DD');
    setPhase3EndDate(date);
  }

  function handleChangePhase4Start(e) {
    const date = moment(e.target.value).format('YYYY-MM-DD');
    setPhase4StartDate(date);
  }

  function handleChangePhase4End(e) {
    const date = moment(e.target.value).format('YYYY-MM-DD');
    setPhase4EndDate(date);
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
          <option>2020 EA Medical Mutual Calendar</option>
          <option>2020 HHP Full Outcomes Calendar</option>
        </select>
      </div>

      <div className="program-dates my-5">
        <h5>Program Dates:</h5>
        <span>Yearlong: Start Date:</span><input id="startDate" className="form-control" type="date" onChange={handleChangeStartDate} />
        <span>End Date:</span><input id="endDate" className="form-control" type="date" onChange={handleChangeEndDate} />
      </div>

      <div className="phase-dates my-5">
        <h5>Phase Dates:</h5>
        <p className="text-muted">
          <span>Phase 1: Start Date:</span><input id="phase1StartDate" className="form-control" type="date" value={phase1StartDate} onChange={handleChangePhase1Start} />
          <span>End Date:</span><input id="phase1EndDate" className="form-control" type="date" value={phase1EndDate} onChange={handleChangePhase1End} />
        </p>
        <p className="text-muted">
          <span>Phase 2: Start Date:</span><input id="phase2StartDate" className="form-control" type="date" value={phase2StartDate} onChange={handleChangePhase2Start} />
          <span>End Date:</span><input id="phase2EndDate" className="form-control" type="date" value={phase2EndDate} onChange={handleChangePhase2End} />
        </p>
        <p className="text-muted">
          <span>Phase 3: Start Date:</span><input id="phase3StartDate" className="form-control" type="date" value={phase3StartDate} onChange={handleChangePhase3Start} />
          <span>End Date:</span><input id="phase3EndDate" className="form-control" type="date" value={phase3EndDate} onChange={handleChangePhase3End} />
        </p>
        <p className="text-muted">
          <span>Phase 4: Start Date:</span><input id="phase4StartDate" className="form-control" type="date" value={phase4StartDate} onChange={handleChangePhase4Start} />
          <span>End Date:</span><input id="phase4EndDate" className="form-control" type="date" value={phase4EndDate} onChange={handleChangePhase4End} />
        </p>
      </div>

      <div className="point-structure my-5">
        <h5>Point Structure:</h5>
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
