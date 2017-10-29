import React, { Component } from 'react';
import { connect } from 'react-redux';

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
          <div className="card">

            <div className="card-header" role="tab" id="headingYearlong">
              <h5 className="mb-0">
                <a data-toggle="collapse" href="#collapseYearlong">
                  <span>Yearlong</span>
                  <span className="left-15">{calendar.yearlong.startDate} - {calendar.yearlong.endDate}</span>
                  <span className="left-15">{calendar.yearlong.points} Points</span>
                  <span className="oi oi-caret-bottom"></span>
                </a>
              </h5>
            </div>

            <div id="collapseYearlong" className="collapse" role="tabpanel" data-parent="#accordion">
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
                    {calendar.yearlong.challenges.map(challenge => this.renderRow(challenge, calendar.yearlong.startDate, calendar.yearlong.endDate))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header" role="tab" id="headingTwo">
              <h5 className="mb-0">
                <a className="collapsed" data-toggle="collapse" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  <span>Phase 1</span>
                  <span className="left-15">01/08/2018 - 04/08/2018</span>
                  <span className="left-15">750 Points</span>
                  <span className="oi oi-caret-bottom"></span>
                </a>
              </h5>
            </div>
            <div id="collapseTwo" className="collapse" role="tabpanel" aria-labelledby="headingTwo" data-parent="#accordion">
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
                    <tr>
                      <td scope="row">Complete a Health Screening</td>
                      <td>Yes</td>
                      <td>CIE</td>
                      <td>
                        <img className="table-icon" src="images/HP_Icon_Health_Fitness.png" />
                        <img className="table-icon" src="images/icon_individual.svg" />
                      </td>
                      <td>01/08/18 - 12/17/18</td>
                      <td>One Time</td>
                      <td>150 (150)</td>
                      <td>
                        <img className="table-icon" src="images/icon_edit.svg" />
                        <img className="table-icon" src="images/icon_comment.svg" />
                        <img className="table-icon" src="images/icon_delete.svg" />
                      </td>
                    </tr>
                    <tr>
                      <td scope="row">Complete a Health Screening</td>
                      <td>Yes</td>
                      <td>CIE</td>
                      <td>
                        <img className="table-icon" src="images/HP_Icon_Health_Fitness.png" />
                        <img className="table-icon" src="images/icon_individual.svg" />
                      </td>
                      <td>01/08/18 - 12/17/18</td>
                      <td>One Time</td>
                      <td>150 (150)</td>
                      <td>
                        <img className="table-icon" src="images/icon_edit.svg" />
                        <img className="table-icon" src="images/icon_comment.svg" />
                        <img className="table-icon" src="images/icon_delete.svg" />
                      </td>
                    </tr>
                    <tr>
                      <td scope="row">Complete a Health Screening</td>
                      <td>Yes</td>
                      <td>CIE</td>
                      <td>
                        <img className="table-icon" src="images/HP_Icon_Health_Fitness.png" />
                        <img className="table-icon" src="images/icon_individual.svg" />
                      </td>
                      <td>01/08/18 - 12/17/18</td>
                      <td>One Time</td>
                      <td>150 (150)</td>
                      <td>
                        <img className="table-icon" src="images/icon_edit.svg" />
                        <img className="table-icon" src="images/icon_comment.svg" />
                        <img className="table-icon" src="images/icon_delete.svg" />
                      </td>
                    </tr>
                    <tr>
                      <td scope="row">Complete a Health Screening</td>
                      <td>Yes</td>
                      <td>CIE</td>
                      <td>
                        <img className="table-icon" src="images/HP_Icon_Health_Fitness.png" />
                        <img className="table-icon" src="images/icon_individual.svg" />
                      </td>
                      <td>01/08/18 - 12/17/18</td>
                      <td>One Time</td>
                      <td>150 (150)</td>
                      <td>
                        <img className="table-icon" src="images/icon_edit.svg" />
                        <img className="table-icon" src="images/icon_comment.svg" />
                        <img className="table-icon" src="images/icon_delete.svg" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header" role="tab" id="headingThree">
              <h5 className="mb-0">
                <a className="collapsed" data-toggle="collapse" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                  <span>Phase 1B</span>
                  <span className="left-15">01/29/2018 - 04/08/2018</span>
                  <span className="left-15">300 Points</span>
                  <span className="oi oi-caret-bottom"></span>
                </a>
              </h5>
            </div>
            <div id="collapseThree" className="collapse" role="tabpanel" aria-labelledby="headingThree" data-parent="#accordion">
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
                    <tr>
                      <td scope="row">Complete a Health Screening</td>
                      <td>Yes</td>
                      <td>CIE</td>
                      <td>
                        <img className="table-icon" src="images/HP_Icon_Health_Fitness.png" />
                        <img className="table-icon" src="images/icon_individual.svg" />
                      </td>
                      <td>01/08/18 - 12/17/18</td>
                      <td>One Time</td>
                      <td>150 (150)</td>
                      <td>
                        <img className="table-icon" src="images/icon_edit.svg" />
                        <img className="table-icon" src="images/icon_comment.svg" />
                        <img className="table-icon" src="images/icon_delete.svg" />
                      </td>
                    </tr>
                    <tr>
                      <td scope="row">Complete a Health Screening</td>
                      <td>Yes</td>
                      <td>CIE</td>
                      <td>
                        <img className="table-icon" src="images/HP_Icon_Health_Fitness.png" />
                        <img className="table-icon" src="images/icon_individual.svg" />
                      </td>
                      <td>01/08/18 - 12/17/18</td>
                      <td>One Time</td>
                      <td>150 (150)</td>
                      <td>
                        <img className="table-icon" src="images/icon_edit.svg" />
                        <img className="table-icon" src="images/icon_comment.svg" />
                        <img className="table-icon" src="images/icon_delete.svg" />
                      </td>
                    </tr>
                    <tr>
                      <td scope="row">Complete a Health Screening</td>
                      <td>Yes</td>
                      <td>CIE</td>
                      <td>
                        <img className="table-icon" src="images/HP_Icon_Health_Fitness.png" />
                        <img className="table-icon" src="images/icon_individual.svg" />
                      </td>
                      <td>01/08/18 - 12/17/18</td>
                      <td>One Time</td>
                      <td>150 (150)</td>
                      <td>
                        <img className="table-icon" src="images/icon_edit.svg" />
                        <img className="table-icon" src="images/icon_comment.svg" />
                        <img className="table-icon" src="images/icon_delete.svg" />
                      </td>
                    </tr>
                    <tr>
                      <td scope="row">Complete a Health Screening</td>
                      <td>Yes</td>
                      <td>CIE</td>
                      <td>
                        <img className="table-icon" src="images/HP_Icon_Health_Fitness.png" />
                        <img className="table-icon" src="images/icon_individual.svg" />
                      </td>
                      <td>01/08/18 - 12/17/18</td>
                      <td>One Time</td>
                      <td>150 (150)</td>
                      <td>
                        <img className="table-icon" src="images/icon_edit.svg" />
                        <img className="table-icon" src="images/icon_comment.svg" />
                        <img className="table-icon" src="images/icon_delete.svg" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
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


function mapStateToProps(state) {
  return {
    calendar: state.selectedCalendar
  };
}

export default connect(mapStateToProps, null)(EditCalendar);
