import React, { Component } from 'react';
import axios from 'axios';

class AccordionCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      challenges: []
    };
  }

  componentDidMount() {
    this.fetchChallenges();
  }

  fetchChallenges() {
    const url = 'https://api.airtable.com/v0/appN1J6yscNwlzbzq/Challenges?api_key=keyCxnlep0bgotSrX';

    axios.get(url)
      .then(response => this.setState({ challenges: response.data.records }))
      .catch(error => console.error(error));
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

  renderRow(challenge) {
    const calendar = this.props.calendar;

    return (
      <tr key={challenge.fields.name}>
        <td scope="row">{challenge.fields.name}</td>
        <td>{challenge.fields.required}</td>
        <td>{challenge.fields.type}</td>
        <td>
          <img className="table-icon" src={this.hpImage(challenge.fields.category)} />
          <img className="table-icon" src={this.teamImage(challenge.fields.team)} />
        </td>
        <td>{calendar.startDate} - {calendar.endDate}</td>
        <td>{challenge.fields.tracking}</td>
      <td>{challenge.fields.points} ({challenge.fields.totalPoints})</td>
        <td>
          <img className="table-icon" src="images/icon_edit.svg" />
          <img className="table-icon" src="images/icon_comment.svg" />
          <img className="table-icon" src="images/icon_delete.svg" />
        </td>
      </tr>
    );
  }

  renderRows(challengeIds) {
    const filteredChallenges = this.state.challenges.filter(challenge => {
      return challengeIds.includes(challenge.id);
    });

    return filteredChallenges.map(challenge => this.renderRow(challenge));
  }

  render() {
    const id = this.props.id;
    const title = this.props.title;
    const calendar = this.props.calendar;

    return (
      <div className="card">

        <div className="card-header" role="tab" id={'header' + id}>
          <h5 className="mb-0">
            <a data-toggle="collapse" href={'#collapse' + id}>
              <span>{title}</span>
              <span className="left-15">{calendar.startDate} - {calendar.endDate}</span>
              <span className="left-15">{calendar.points} Points</span>
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
                {calendar[id] ?  this.renderRows(calendar[id]) : ''}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    );
  }
}

export default AccordionCard;
