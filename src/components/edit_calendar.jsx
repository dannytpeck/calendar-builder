import React, { Component } from 'react';

import Header from './header';
import ClientName from './client_name';
import AccordionCard from './accordion_card';

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

  render() {
    const calendar = this.props.selectedCalendar;
    const yearlong = calendar.filter(challenge => {
      return challenge.fields.Phase === 'Yearlong';
    });
    const phase1 = calendar.filter(challenge => {
      return challenge.fields.Phase === 'Phase 1';
    });
    const phase1b = calendar.filter(challenge => {
      return challenge.fields.Phase === 'Phase 1B';
    });
    const phase2 = calendar.filter(challenge => {
      return challenge.fields.Phase === 'Phase 2';
    });
    const phase2b = calendar.filter(challenge => {
      return challenge.fields.Phase === 'Phase 2B';
    });
    const phase3 = calendar.filter(challenge => {
      return challenge.fields.Phase === 'Phase 3';
    });
    const phase3b = calendar.filter(challenge => {
      return challenge.fields.Phase === 'Phase 3B';
    });
    const phase4 = calendar.filter(challenge => {
      return challenge.fields.Phase === 'Phase 4';
    });
    const phase4b = calendar.filter(challenge => {
      return challenge.fields.Phase === 'Phase 4B';
    });

    return (
      <div className="add-calendar">
        <Header />
        <h2>Edit Calendar</h2>
        <ClientName selectedClient={this.props.selectedClient} />

        <div className="calendar-name-and-link">
          <h4 className="calendar-name">{'Calendar_' + calendar[0].fields['Program Year']}</h4>
          <img className="calendar-link"
            type="image"
            src="images/icon_link.svg"
            data-toggle="tooltip"
            data-placement="bottom"
            title="<h5 class='my-3'>Link to this Calendar</h5><h5 class='my-3'>https://mywellnessnumbers.com/cb/iifhjhwlxxxxa</h5>" />
        </div>

        <div className="calendar-accordion my-4 clear" id="accordion" role="tablist">
          <AccordionCard title={'Yearlong'} id={'yearlong'} calendar={yearlong} />
          <AccordionCard title={'Phase 1'} id={'phase1'} calendar={phase1} />
          <AccordionCard title={'Phase 1B'} id={'phase1b'} calendar={phase1b} />
          <AccordionCard title={'Phase 2'} id={'phase2'} calendar={phase2} />
          <AccordionCard title={'Phase 2B'} id={'phase2b'} calendar={phase2b} />
          <AccordionCard title={'Phase 3'} id={'phase3'} calendar={phase3} />
          <AccordionCard title={'Phase 3B'} id={'phase3b'} calendar={phase3b} />
          <AccordionCard title={'Phase 4'} id={'phase4'} calendar={phase4} />
          <AccordionCard title={'Phase 4B'} id={'phase4b'} calendar={phase4b} />
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
