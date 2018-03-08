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
      oneTimePoints: 0,
      weeklyPoints: 0,
      teamPoints: 0,
      calendar: null
    };

    this.handleChangeTemplate = this.handleChangeTemplate.bind(this);
    this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
    this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
    this.handleChangeOneTimePoints = this.handleChangeOneTimePoints.bind(this);
    this.handleChangeWeeklyPoints = this.handleChangeWeeklyPoints.bind(this);
    this.handleChangeTeamPoints = this.handleChangeTeamPoints.bind(this);

    this.calculatePhases = this.calculatePhases.bind(this);
    this.loadTemplate = this.loadTemplate.bind(this);
    this.createCalendar = this.createCalendar.bind(this);
  }

  componentDidMount() {
    //this.loadTemplate();
  }

  loadTemplate() {
    const url = 'https://api.airtable.com/v0/appN1J6yscNwlzbzq/Templates?api_key=keyCxnlep0bgotSrX&view=Default';

    axios.get(url)
      .then(response => {
        this.props.handleNextClick(response.data.records);
      })
      .catch(error => console.error(error));
  }

  createCalendar() {
    const startDate = this.state.startDate;
    const endDate = this.state.endDate;
    const phase1start = startDate;
    const phase1end = moment(phase1start).add(90, 'days').format();
    const phase2start = moment(phase1end).add(1, 'days').format();
    const phase2end = moment(phase2start).add(83, 'days').format();
    const phase3start = moment(phase2end).add(1, 'days').format();
    const phase3end = moment(phase3start).add(83, 'days').format();
    const phase4start = moment(phase3end).add(1, 'days').format();
    const phase4end = endDate;

    console.log(this.state);
  }

  calculatePhases() {
    const startDate = this.state.startDate;
    const endDate = this.state.endDate;
    const phase1start = startDate;
    const phase1end = moment(phase1start).add(90, 'days').format();
    const phase2start = moment(phase1end).add(1, 'days').format();
    const phase2end = moment(phase2start).add(83, 'days').format();
    const phase3start = moment(phase2end).add(1, 'days').format();
    const phase3end = moment(phase3start).add(83, 'days').format();
    const phase4start = moment(phase3end).add(1, 'days').format();
    const phase4end = endDate;

    console.log(`
      yearlong: ${startDate} - ${endDate}
      phase1: ${phase1start} - ${phase1end}
      phase2: ${phase2start} - ${phase2end}
      phase3: ${phase3start} - ${phase3end}
      phase4: ${phase4start} - ${phase4end}
    `);

    return {
      yearlong: startDate - endDate,
      phase1: phase1start - phase1end,
      phase2: phase2start - phase2end,
      phase3: phase3start - phase3end,
      phase4: phase4start - phase4end
    };
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
          <select className="form-control" onChange={this.handleChangeTemplate}>
            <option>none</option>
            <option>HP 2018 Calendar</option>
          </select>
        </div>

        <div className="program-dates my-5">
          <h5>Program Dates:</h5>
          <span>Start Date:</span><input className="form-control" type="date" onChange={this.handleChangeStartDate} />
          <span>End Date:</span><input className="form-control" type="date" onChange={this.handleChangeEndDate} />
        </div>

        <div className="point-structure my-5">
          <h5 className="my-4">Point Structure:</h5>
          <p>
            <span>One-Time Challenge:</span>
            <input className="form-control" type="text" onChange={this.handleChangeOneTimePoints} />
            <span>points</span>
          </p>
          <p>
            <span>Weekly Challenges:</span>
            <input className="form-control" type="text" onChange={this.handleChangeWeeklyPoints} />
            <span>points</span>
          </p>
          <p>
            <span>Team Challenge:</span>
            <input className="form-control" type="text" onChange={this.handleChangeTeamPoints} />
            <span>points</span>
          </p>
        </div>

        <div className="buttons my-5">
          <span className="cancel-button" onClick={this.props.handleCancelClick}>Cancel</span>
          {/* <button className="btn btn-primary next-button" onClick={this.loadTemplate}>Next</button> */}
          <button className="btn btn-primary next-button" onClick={this.createCalendar}>Next</button>
        </div>

      </div>
    );
  }
}

export default AddCalendar;
