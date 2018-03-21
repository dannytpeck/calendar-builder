import React, { Component } from 'react';
import moment from 'moment';
import Airtable from 'airtable';
const base = new Airtable({ apiKey: 'keyCxnlep0bgotSrX' }).base('appN1J6yscNwlzbzq');

import Header from './header';
import ClientName from './client_name';
import AccordionCard from './accordion_card';

class EditCalendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      challenges: [],
      calendar: []
    };

    this.addChallengeToCalendar = this.addChallengeToCalendar.bind(this);
  }

  componentDidMount() {
    this.fetchChallenges();
    this.fetchCalendar();

    /* global $ */
    $('.calendar-link').tooltip({
      html: true,
      trigger: 'click'
    });
  }

  fetchCalendar() {
    const employerName = this.props.selectedClient.fields['Limeade e='];
    const programYear = this.props.programYear;

    base('Challenges').select({
      view: 'Default',
      filterByFormula: `AND({EmployerName}='${employerName}',{Program Year}='${programYear}')`
    }).eachPage((records, fetchNextPage) => {

      this.setState({ calendar: records });

      fetchNextPage();
    }, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
  }

  fetchChallenges() {
    base('LibraryChallenges').select({
      view: 'Default'
    }).eachPage((records, fetchNextPage) => {

      this.setState({ challenges: [...this.state.challenges, ...records] });

      fetchNextPage();
    }, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
  }

  addChallengeToCalendar(challenge) {
    const newCalendar = [...this.state.calendar, challenge];
    this.setState({ calendar: newCalendar });

    this.props.selectChallenge(null);
  }

  render() {
    const calendar = this.state.calendar;

    const yearlong = calendar.filter(challenge => challenge.fields.Phase === 'Yearlong');
    const phase1 = calendar.filter(challenge => challenge.fields.Phase === 'Phase 1');
    const phase1b = calendar.filter(challenge => challenge.fields.Phase === 'Phase 1B');
    const phase2 = calendar.filter(challenge => challenge.fields.Phase === 'Phase 2');
    const phase2b = calendar.filter(challenge => challenge.fields.Phase === 'Phase 2B');
    const phase3 = calendar.filter(challenge => challenge.fields.Phase === 'Phase 3');
    const phase3b = calendar.filter(challenge => challenge.fields.Phase === 'Phase 3B');
    const phase4 = calendar.filter(challenge => challenge.fields.Phase === 'Phase 4');
    const phase4b = calendar.filter(challenge => challenge.fields.Phase === 'Phase 4B');

    let totalPoints = 0;
    calendar.map(challenge => {
      const points = Number(challenge.fields['Total Points']);
      if (!isNaN(points)) {
        totalPoints += points;
      }
    });

    const programYear = calendar[0] && calendar[0].fields['Program Year'] ? calendar[0].fields['Program Year'] : moment().format('YYYY');

    return (
      <div className="add-calendar">
        <Header />
        <h2>Edit Calendar</h2>
        <ClientName selectedClient={this.props.selectedClient} />

        <div className="calendar-name-and-link">
          <h4 className="calendar-name">{'Calendar_' + programYear}</h4>
          <img className="calendar-link"
            type="image"
            src="images/icon_link.svg"
            data-toggle="tooltip"
            data-placement="bottom"
            title="<h5 class='my-3'>Link to this Calendar</h5><h5 class='my-3'>https://mywellnessnumbers.com/cb/iifhjhwlxxxxa</h5>" />
        </div>

        <div className="calendar-accordion my-4 clear" id="accordion" role="tablist">
          {<AccordionCard
            calendar={yearlong} id={'yearlong'} title={'Yearlong'}
            challenges={this.state.challenges}
            selectedCalendar={this.state.calendar}
            selectChallenge={this.props.selectChallenge}
            selectedClient={this.props.selectedClient}
            selectedChallenge={this.props.selectedChallenge}
            handleEditChallengeClick={this.props.handleEditChallengeClick}
            addChallengeToCalendar={this.addChallengeToCalendar} />}
          {<AccordionCard
            calendar={phase1} id={'phase1'} title={'Phase 1'}
            challenges={this.state.challenges}
            selectedCalendar={this.state.calendar}
            selectChallenge={this.props.selectChallenge}
            selectedClient={this.props.selectedClient}
            selectedChallenge={this.props.selectedChallenge}
            handleEditChallengeClick={this.props.handleEditChallengeClick}
            addChallengeToCalendar={this.addChallengeToCalendar} />}
          {<AccordionCard
            calendar={phase1b} id={'phase1b'} title={'Phase 1B'}
            challenges={this.state.challenges}
            selectedCalendar={this.state.calendar}
            selectChallenge={this.props.selectChallenge}
            selectedClient={this.props.selectedClient}
            selectedChallenge={this.props.selectedChallenge}
            handleEditChallengeClick={this.props.handleEditChallengeClick}
            addChallengeToCalendar={this.addChallengeToCalendar} />}
          {<AccordionCard
            calendar={phase2} id={'phase2'} title={'Phase 2'}
            challenges={this.state.challenges}
            selectedCalendar={this.state.calendar}
            selectChallenge={this.props.selectChallenge}
            selectedClient={this.props.selectedClient}
            selectedChallenge={this.props.selectedChallenge}
            handleEditChallengeClick={this.props.handleEditChallengeClick}
            addChallengeToCalendar={this.addChallengeToCalendar} />}
          {<AccordionCard
            calendar={phase2b} id={'phase2b'} title={'Phase 2B'}
            challenges={this.state.challenges}
            selectedCalendar={this.state.calendar}
            selectChallenge={this.props.selectChallenge}
            selectedClient={this.props.selectedClient}
            selectedChallenge={this.props.selectedChallenge}
            handleEditChallengeClick={this.props.handleEditChallengeClick}
            addChallengeToCalendar={this.addChallengeToCalendar} />}
          {<AccordionCard
            calendar={phase3} id={'phase3'} title={'Phase 3'}
            challenges={this.state.challenges}
            selectedCalendar={this.state.calendar}
            selectChallenge={this.props.selectChallenge}
            selectedClient={this.props.selectedClient}
            selectedChallenge={this.props.selectedChallenge}
            handleEditChallengeClick={this.props.handleEditChallengeClick}
            addChallengeToCalendar={this.addChallengeToCalendar} />}
          {<AccordionCard
            calendar={phase3b} id={'phase3b'} title={'Phase 3B'}
            challenges={this.state.challenges}
            selectedCalendar={this.state.calendar}
            selectChallenge={this.props.selectChallenge}
            selectedClient={this.props.selectedClient}
            selectedChallenge={this.props.selectedChallenge}
            handleEditChallengeClick={this.props.handleEditChallengeClick}
            addChallengeToCalendar={this.addChallengeToCalendar} />}
          {<AccordionCard
            calendar={phase4} id={'phase4'} title={'Phase 4'}
            challenges={this.state.challenges}
            selectedCalendar={this.state.calendar}
            selectChallenge={this.props.selectChallenge}
            selectedClient={this.props.selectedClient}
            selectedChallenge={this.props.selectedChallenge}
            handleEditChallengeClick={this.props.handleEditChallengeClick}
            addChallengeToCalendar={this.addChallengeToCalendar} />}
          {<AccordionCard
            calendar={phase4b} id={'phase4b'} title={'Phase 4B'}
            challenges={this.state.challenges}
            selectedCalendar={this.state.calendar}
            selectChallenge={this.props.selectChallenge}
            selectedClient={this.props.selectedClient}
            selectedChallenge={this.props.selectedChallenge}
            handleEditChallengeClick={this.props.handleEditChallengeClick}
            addChallengeToCalendar={this.addChallengeToCalendar} />}
        </div>

        <h5 className="point-total my-3">{totalPoints} Points</h5>

        <div className="buttons">
          <span className="cancel-button" onClick={this.props.handleCancelClick}>Cancel</span>
          <button className="btn btn-primary done-button" onClick={this.props.handleDoneClick}>Done</button>
        </div>

      </div>
    );
  }
}

export default EditCalendar;
