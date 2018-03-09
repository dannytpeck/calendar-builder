import React, { Component } from 'react';
import axios from 'axios';

import ChallengeSelect from './challenge_select';

class AccordionCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      challenges: []
    };
  }

  editChallenge(challenge) {
    this.props.selectChallenge(challenge);
    this.props.handleEditChallengeClick();
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
    if (team === 'Team') {
      return 'images/icon_team.svg';
    } else {
      return 'images/icon_individual.svg';
    }
  }

  renderRow(challenge) {
    if (challenge.fields) {
      return (
        <tr key={challenge.id}>
          <td scope="row">{challenge.fields['Name']}</td>
          <td>{challenge.fields['Required']}</td>
          <td>{challenge.fields['Verified'] === 'No' ? 'Self-Report' : 'CIE'}</td>
          <td>
            <img className="table-icon" src={this.hpImage(challenge.fields['HP Element'])} />
            <img className="table-icon" src={this.teamImage(challenge.fields['Team/Ix'])} />
          </td>
          <td>{challenge.fields['Start date']} - {challenge.fields['End date']}</td>
          <td>{challenge.fields['Frequency']}</td>
        <td>{challenge.fields['Points']} ({challenge.fields['Total Points']})</td>
          <td>
            <img className="table-icon" src="images/icon_edit.svg" onClick={() => this.editChallenge(challenge)} />
            <img className="table-icon" src="images/icon_comment.svg" />
            <img className="table-icon" src="images/icon_delete.svg" />
          </td>
        </tr>
      );
    }
  }

  render() {
    const { id, calendar, title } = this.props;

    let startDate, endDate, totalPoints = 0;
    if (calendar.length > 0) {
      startDate = calendar[0].fields['Start date'];
      endDate = calendar[0].fields['End date'];
      calendar.map(challenge => {
        totalPoints += Number(challenge.fields['Total Points']);
      });
    } else {
      startDate = '';
      endDate = '';
    }

    return (
      <div className="card">

        <div className="card-header" role="tab" id={'header' + id}>
          <h5 className="mb-0">
            <a data-toggle="collapse" href={'#collapse' + id}>
              <span>{title}</span>
              <span className="left-15">{startDate} - {endDate}</span>
              <span className="left-abs-73">{totalPoints} Points</span>
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
                {calendar.map(challenge => this.renderRow(challenge))}
              </tbody>
              <tfoot>
                <tr>
                  <td>
                    <img className="add-challenge-icon" src="/images/icon_add.svg" />
                    <span className="add-challenge-text">Add Challenge</span>
                    <ChallengeSelect challenges={this.props.challenges} />
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

      </div>
    );
  }
}

export default AccordionCard;
