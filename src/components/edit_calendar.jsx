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

  render() {
    return (
      <div className="add-calendar">
        <Header />
        <h2>Edit Calendar</h2>
        <ClientName />

        <div className="calendar-name-and-link">
          <h4 className="calendar-name">Calendar_2018</h4>
          <img className="calendar-link" src="images/icon_link.svg" />
        </div>

        <div className="calendar-accordion my-4 clear" id="accordion" role="tablist">
          <div className="card">
            <div className="card-header" role="tab" id="headingOne">
              <h5 className="mb-0">
                <a data-toggle="collapse" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  <span>Yearlong</span>
                  <span className="left-15">01/08/2018 - 12/17/2018</span>
                  <span className="left-15">800 Points</span>
                  <span className="oi oi-caret-bottom"></span>
                </a>
              </h5>
            </div>
            <div id="collapseOne" className="collapse show" role="tabpanel" aria-labelledby="headingOne" data-parent="#accordion">
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

export default EditCalendar;
