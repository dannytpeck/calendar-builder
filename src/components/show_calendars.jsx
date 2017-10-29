import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from './header';
import ClientSelect from './client_select';
import GetStartedFolder from './get_started_folder';
import ClientName from './client_name';
import CalendarTable from './calendar_table';

class ShowCalendars extends Component {
  renderCalendars() {
    return (
      <div>
        <ClientName />
        <h5 className="my-5">Calendars:</h5>
        <CalendarTable handleEditClick={this.props.handleEditClick} />
        <div className="add-calendar-button my-4" onClick={this.props.handleAddClick}>
          <img className="add-icon" src="images/icon_add.svg" />
          <h5>Add New Calendar</h5>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="show-calendars">
        <Header />
        <ClientSelect />
        {this.props.client.name ? this.renderCalendars() : <GetStartedFolder />}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    client: state.selectedClient
  };
}

export default connect(mapStateToProps, null)(ShowCalendars);
