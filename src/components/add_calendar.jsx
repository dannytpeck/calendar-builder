import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

import Header from './header';
import ClientName from './client_name';

class AddCalendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      template: null,
      startDate: null,
      endDate: null,
      oneTimePoints: null,
      weeklyPoints: null,
      teamPoints: null,
      calendar: null
    };

    this.handleChangeTemplate = this.handleChangeTemplate.bind(this);
    this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
    this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
    this.handleChangeOneTimePoints = this.handleChangeOneTimePoints.bind(this);
    this.handleChangeWeeklyPoints = this.handleChangeWeeklyPoints.bind(this);
    this.handleChangeTeamPoints = this.handleChangeTeamPoints.bind(this);

    this.createCalendar = this.createCalendar.bind(this);
    this.submitCalendar = this.submitCalendar.bind(this);
  }

  validateFields() {
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

  createCalendar(records) {
    const { startDate, endDate, oneTimePoints, weeklyPoints, teamPoints } = this.state;

    const phase1start = startDate;
    const phase1bstart = moment(phase1start).add(21, 'days').format();
    const phase1end = moment(phase1start).add(90, 'days').format();
    const phase2start = moment(phase1end).add(1, 'days').format();
    const phase2bstart = moment(phase2start).add(21, 'days').format();
    const phase2end = moment(phase2start).add(83, 'days').format();
    const phase3start = moment(phase2end).add(1, 'days').format();
    const phase3bstart = moment(phase3start).add(21, 'days').format();
    const phase3end = moment(phase3start).add(83, 'days').format();
    const phase4start = moment(phase3end).add(1, 'days').format();
    const phase4bstart = moment(phase4start).add(21, 'days').format();
    const phase4end = endDate;

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
      const teamType = record.fields['Team/Ix'];
      const frequency = record.fields['Frequency'];
      const verified = record.fields['Verified'] === 'Yes';

      if (!verified) {
        if (teamType === 'Team') {
          record.fields['Points'] = teamPoints;
        } else {
          if (frequency === 'One Time') {
            record.fields['Points'] = oneTimePoints;
          } else if (frequency === 'Weekly') {
            record.fields['Points'] = weeklyPoints;
          }
        }
      }

    });

    // Create the calendar in airtable db
    const url = 'https://api.airtable.com/v0/appN1J6yscNwlzbzq/Calendars?api_key=keyCxnlep0bgotSrX';
    const year = moment(startDate).format('YYYY');
    this.props.setProgramYear(year);
    const data = {
      fields: {
        client: this.props.selectedClient.fields['Limeade e='],
        name: 'Calendar_' + year,
        year: year,
        updated: moment().format('L'),
        status: 'In Progress'
      }
    };

    axios.post(url, data)
      .catch(error => console.error(error));

    return records;
  }

  submitCalendar(e) {
    const validated = this.validateFields();
    const { template } = this.state;

    if (validated) {
      let url;

      switch (template) {
        case 'HP 2018 Calendar':
          url = 'https://api.airtable.com/v0/appN1J6yscNwlzbzq/Templates?api_key=keyCxnlep0bgotSrX&view=Default';
          break;
        default:
          url = 'https://api.airtable.com/v0/appN1J6yscNwlzbzq/EmptyCalendar?api_key=keyCxnlep0bgotSrX';
          break;
      }

      axios.get(url)
        .then(response => {
          const calendar = this.createCalendar(response.data.records);
          this.props.handleNextClick(calendar);

        })
        .catch(error => console.error(error));
    }

  }

  handleChangeTemplate(e) {
    this.setState({ template: e.target.value });
  }

  handleChangeStartDate(e) {
    const date = moment(e.target.value).format();
    this.setState({ startDate: date });
  }

  handleChangeEndDate(e) {
    const date = moment(e.target.value).format();
    this.setState({ endDate: date });
  }

  handleChangeOneTimePoints(e) {
    this.setState({ oneTimePoints: e.target.value });
  }

  handleChangeWeeklyPoints(e) {
    this.setState({ weeklyPoints: e.target.value });
  }

  handleChangeTeamPoints(e) {
    this.setState({ teamPoints: e.target.value });
  }

  render() {
    return (
      <div className="add-calendar">
        <Header />
        <h2>Create New Calendar</h2>
        <ClientName selectedClient={this.props.selectedClient} />

        <div className="select-template my-5">
          <h5>Select Template:</h5>
          <select id="template" className="form-control" onChange={this.handleChangeTemplate}>
            <option>None</option>
            <option>HP 2018 Calendar</option>
          </select>
        </div>

        <div className="program-dates my-5">
          <h5>Program Dates:</h5>
          <span>Start Date:</span><input id="startDate" className="form-control" type="date" onChange={this.handleChangeStartDate} />
          <span>End Date:</span><input id="endDate" className="form-control" type="date" onChange={this.handleChangeEndDate} />
        </div>

        <div className="point-structure my-5">
          <h5 className="my-4">Point Structure:</h5>
          <p>
            <span>One-Time Challenge:</span>
            <input id="oneTimePoints" className="form-control" type="text" onChange={this.handleChangeOneTimePoints} />
            <span>points</span>
          </p>
          <p>
            <span>Weekly Challenges:</span>
            <input id="weeklyPoints" className="form-control" type="text" onChange={this.handleChangeWeeklyPoints} />
            <span>points</span>
          </p>
          <p>
            <span>Team Challenge:</span>
            <input id="teamPoints" className="form-control" type="text" onChange={this.handleChangeTeamPoints} />
            <span>points</span>
          </p>
        </div>

        <div className="buttons my-5">
          <span className="cancel-button" onClick={this.props.handleCancelClick}>Cancel</span>
          <button className="btn btn-primary next-button" onClick={this.submitCalendar}>Next</button>
        </div>

      </div>
    );
  }
}

export default AddCalendar;
