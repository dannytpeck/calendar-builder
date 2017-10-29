import React, { Component } from 'react';
import { connect } from 'react-redux';

class CalendarTable extends Component {
  constructor(props) {
    super(props);

    this.renderRow = this.renderRow.bind(this);
  }

  renderRow(calendar) {
    return (
      <tr key={calendar.name}>
        <td>{calendar.name}</td>
        <td>{calendar.year}</td>
        <td>{calendar.updated}</td>
        <td>{calendar.status}</td>
        <td>
          <img onClick={this.props.handleEditClick} className="edit-icon" src="images/icon_edit.svg" />
        </td>
        <td>
          <img className="delete-icon" src="images/icon_delete.svg" />
        </td>
      </tr>
    );
  }

  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Program Year</th>
            <th>Last Update</th>
            <th>Status</th>
            <th>Actions</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {this.props.calendars.map(this.renderRow)}
        </tbody>
      </table>
    );
  }
}

function mapStateToProps(state) {
  return {
    calendars: state.selectedClient.calendars
  };
}

export default connect(mapStateToProps, null)(CalendarTable);
