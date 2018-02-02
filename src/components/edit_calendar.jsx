import React, { Component } from 'react';

import Header from './header';
import ClientName from './client_name';

class EditCalendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      points: 5000
    };
  }

  componentDidMount() {
    /* global $ */
    $('.calendar-link').tooltip({
      html: true,
      trigger: 'click'
    });
  }

  hpImage(category) {
    switch (category) {
      case 'Health & Fitness':
        return 'images/HP_Icon_Health_Fitness.png';
      case 'Growth & Development':
        return 'images/HP_Icon_Growth_Development.png';
      case 'Contribution & Sustainability':
        return 'images/HP_Icon_Contribution_Sustainability.png';
      case 'Money & Prosperity':
        return 'images/HP_Icon_Money_Prosperity.png';
    }
  }

  teamImage(team) {
    if (team === 'Yes') {
      return 'images/icon_team.svg';
    } else {
      return 'images/icon_individual.svg';
    }
  }

  renderRow(challenge, startDate, endDate) {
    return (
      <tr key={challenge.name}>
        <td scope="row">{challenge.name}</td>
        <td>{challenge.required}</td>
        <td>{challenge.type}</td>
        <td>
          <img className="table-icon" src={this.hpImage(challenge.category)} />
          <img className="table-icon" src={this.teamImage(challenge.team)} />
        </td>
        <td>{startDate} - {endDate}</td>
        <td>{challenge.tracking}</td>
      <td>{challenge.points} ({challenge.totalPoints})</td>
        <td>
          <img className="table-icon" src="images/icon_edit.svg" />
          <img className="table-icon" src="images/icon_comment.svg" />
          <img className="table-icon" src="images/icon_delete.svg" />
        </td>
      </tr>
    );
  }

  renderCard(title, id, calendarPeriod) {
    return (
      <div className="card">

        <div className="card-header" role="tab" id={'header' + id}>
          <h5 className="mb-0">
            <a data-toggle="collapse" href={'#collapse' + id}>
              <span>{title}</span>
              <span className="left-15">{calendarPeriod.startDate} - {calendarPeriod.endDate}</span>
              <span className="left-15">{calendarPeriod.points} Points</span>
              <span className="oi oi-caret-bottom"></span>
            </a>
          </h5>
        </div>

        <div id={'collapse' + id} className="collapse" role="tabpanel" data-parent="#accordion">
          <div className="card-body">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Required?</th>
                  <th scope="col">Type</th>
                  <th scope="col">Category</th>
                  <th scope="col">Dates</th>
                  <th scope="col">Tracking</th>
                  <th scope="col">Points (Total)</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {calendarPeriod.challenges.map(challenge => this.renderRow(challenge, calendarPeriod.startDate, calendarPeriod.endDate))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    );
  }

  render() {
    const calendar = this.props.calendar;

    return (
      <div className="add-calendar">
        <Header />
        <h2>Edit Calendar</h2>
        <ClientName />

        <div className="calendar-name-and-link">
          <h4 className="calendar-name">{calendar.name}</h4>
          <img className="calendar-link"
            type="image"
            src="images/icon_link.svg"
            data-toggle="tooltip"
            data-placement="bottom"
            title="<h5 class='my-3'>Link to this Calendar</h5><h5 class='my-3'>https://mywellnessnumbers.com/cb/iifhjhwlxxxxa</h5>" />
        </div>

        <div className="calendar-accordion my-4 clear" id="accordion" role="tablist">
          {this.renderCard('Yearlong', 'yearlong', calendar.yearlong)}
          {this.renderCard('Phase 1', 'one', calendar.phase1)}
          {this.renderCard('Phase 1B', 'oneB', calendar.phase1b)}
          {this.renderCard('Phase 2', 'two', calendar.phase2)}
          {this.renderCard('Phase 2B', 'twoB', calendar.phase2b)}
          {this.renderCard('Phase 3', 'three', calendar.phase3)}
          {this.renderCard('Phase 3B', 'threeB', calendar.phase3b)}
          {this.renderCard('Phase 4', 'four', calendar.phase4)}
          {this.renderCard('Phase 4B', 'fourB', calendar.phase4b)}
        </div>

        <h5 className="point-total my-3">{this.state.points} Points</h5>

        <div className="buttons">
          <span className="cancel-button" onClick={this.props.handleCancelClick}>Cancel</span>
          <button className="btn btn-primary done-button" onClick={this.props.handleDoneClick}>Done</button>
        </div>

      </div>
    );
  }
}

export default EditCalendar;
