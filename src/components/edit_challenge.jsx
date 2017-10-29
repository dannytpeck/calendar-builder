import React, { Component } from 'react';

import Header from './header';

class EditChallenge extends Component {
  render() {
    return (
      <div className="edit-challenge">
        <Header />

        <h2 className="my-4">Edit Challenge</h2>

        <div className="row">
          <div className="col-3">
            <label htmlFor="start-date">Start Date</label>
            <div className="input-group">
              <input type="date" className="form-control" id="start-date" />
            </div>
          </div>

          <div className="col-3">
            <label htmlFor="end-date">End Date</label>
            <div className="input-group">
              <input type="date" className="form-control" id="end-date" />
            </div>
          </div>

          <div className="col-6">
            <div className="preview">
              <img src="images/sample-preview.png" />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-4">
            <label htmlFor="individual-team">Individual/Team</label>
            <div className="input-group">
              <select className="custom-select form-control" id="individual-team">
                <option defaultValue value="Individual">Individual</option>
                <option value="Units - Challenge Period">Team</option>
              </select>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-4">
            <label htmlFor="tracking-type">Tracking Type</label>
            <div className="input-group">
              <select className="custom-select form-control" id="tracking-type">
                <option defaultValue value="One Time">One Time</option>
                <option value="Units - Challenge Period">Units - Challenge Period</option>
                <option value="Days - Challenge Period">Days - Challenge Period</option>
                <option value="Units Each Week">Units Each Week</option>
                <option value="Days Each Week">Days Each Week</option>
              </select>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-1">
            <label htmlFor="points">Points</label>
            <div className="input-group">
              <input type="text" className="form-control" id="points" />
            </div>
          </div>

          <div className="col-4">
            <label htmlFor="tracking-text">Tracking Text</label>
            <div className="input-group">
              <input type="text" className="form-control" id="tracking-text" />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-3">
            <h5>Targeting</h5>
          </div>

          <div className="col-3">
            <button className="btn btn-secondary right">Remove Targeting</button>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <img className="add-targeting-button" src="images/icon_add.svg" />
            <span> Add Targeting</span>
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            <hr />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <h5>Content</h5>
          </div>
        </div>

        <div className="row">
          <div className="col-4">
            <label htmlFor="title">Title</label>
            <div className="input-group">
              <input type="text" className="form-control" id="title" />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-4">
            <label htmlFor="image-url">Image URL</label>
            <div className="input-group">
              <input type="text" className="form-control" id="image-url" />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-5">
            <label htmlFor="short-description">Short Description</label>
            <div className="input-group">
              <textarea className="form-control" id="short-description" rows="4"></textarea>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-4">
            <label htmlFor="tagline">Tagline</label>
            <div className="input-group">
              <input type="text" className="form-control" id="tagline" />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-5">
            <label htmlFor="long-description">Long Description</label>
            <div className="input-group">
              <textarea className="form-control" id="long-description" rows="8"></textarea>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-3">
            <h5>Additional Resources</h5>
          </div>

          <div className="col-3">
            <button className="btn btn-secondary right">Remove Resources</button>
          </div>
        </div>

        <div className="row">
          <div className="col-2">
            <label htmlFor="url-1">URL</label>
            <div className="input-group">
              <input type="text" className="form-control" id="url-1" />
            </div>
          </div>

          <div className="col-2">
            <label htmlFor="link-text-1">Link Text</label>
            <div className="input-group">
              <input type="text" className="form-control" id="link-text-1" />
            </div>
          </div>

          <div className="col-1">
            <img className="delete-resource-icon" src="images/icon_delete.svg" />
          </div>
        </div>

        <div className="row">
          <div className="col-2">
            <label htmlFor="url-1">URL</label>
            <div className="input-group">
              <input type="text" className="form-control" id="url-1" />
            </div>
          </div>

          <div className="col-2">
            <label htmlFor="link-text-1">Link Text</label>
            <div className="input-group">
              <input type="text" className="form-control" id="link-text-1" />
            </div>
          </div>

          <div className="col-1">
            <img className="delete-resource-icon" src="images/icon_delete.svg" />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <img className="add-resource-button" src="images/icon_add.svg" />
            <span> Add another resource</span>
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            <hr />
          </div>
        </div>

        <div className="row">
          <div className="col-3">
            <h5>Coaching</h5>
          </div>

          <div className="col-3">
            <button className="btn btn-secondary right">Remove Coaching</button>
          </div>
        </div>

        <div className="row">
          <div className="col-3">
            <label htmlFor="coaching-message">Coaching Message</label>
          </div>

          <div className="col-3">
            <div className="input-group">
              <select className="custom-select form-control" id="coaching-message">
                <option defaultValue value="General">General</option>
                <option value="Get Moving">Get Moving</option>
                <option value="Lighten Up">Lighten Up</option>
                <option value="Change Your Habits">Change Your Habits</option>
                <option value="Live Empowered">Live Empowered</option>
                <option value="Mission Nutrition">Mission Nutrition</option>
                <option value="Mood & Food">Mood &amp; Food</option>
              </select>
            </div>
          </div>
        </div>

        <div className="buttons">
          <span className="cancel-button" onClick={this.props.handleCancelClick}>Cancel</span>
          <button className="btn btn-primary done-button">Done</button>
        </div>

      </div>
    );
  }
}

export default EditChallenge;
