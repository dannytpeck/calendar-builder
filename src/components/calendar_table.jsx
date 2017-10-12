import React, { Component } from 'react';

class CalendarTable extends Component {
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
          <tr>
            <td>Calendar_2018</td>
            <td>2018</td>
            <td>July 10, 2017</td>
            <td>In Progress</td>
            <td><img className="edit-icon" src="images/icon_edit.svg" /></td>
            <td><img className="delete-icon" src="images/icon_delete.svg" /></td>
          </tr>
          <tr>
            <td>Calendar_2017</td>
            <td>2017</td>
            <td>October 5, 2016</td>
            <td>Done</td>
            <td><img className="edit-icon" src="images/icon_edit.svg" /></td>
            <td><img className="delete-icon" src="images/icon_delete.svg" /></td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default CalendarTable;
