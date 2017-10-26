import React, { Component } from 'react';

import Header from './header';
import ClientName from './client_name';

class AddCalendar extends Component {
  render() {
    return (
      <div className="add-calendar">
        <Header />
        <h2>Create New Calendar</h2>
        <ClientName />

        <div className="select-template my-5">
          <h5>Select Template:</h5>
          <select className="form-control">
            <option>none</option>
            <option>HP 2018 Calendar</option>
          </select>
        </div>

        <div className="program-dates my-5">
          <h5>Program Dates:</h5>
          <span>Start Date:</span><input className="form-control" type="date" />
          <span>End Date:</span><input className="form-control" type="date" />
        </div>

        <div className="point-structure my-5">
          <h5 className="my-4">Point Structure:</h5>
          <p>
            <span>One-Time Challenge:</span><input className="form-control" type="text" /><span>points</span>
          </p>
          <p>
            <span>Weekly Challenges:</span><input className="form-control" type="text" /><span>points</span>
          </p>
          <p>
            <span>Team Challenge:</span><input className="form-control" type="text" /><span>points</span>
          </p>
        </div>

        <div className="buttons my-5">
          <span className="cancel-button" onClick={this.props.handleCancelClick}>Cancel</span>
          <button className="btn btn-primary next-button" onClick={this.props.handleNextClick}>Next</button>
        </div>

      </div>
    );
  }
}

export default AddCalendar;
