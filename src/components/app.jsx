import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div className="app">

        <div className="header">
          <a href="#">
            <img className="home-button" src="/images/icon_home.png" />
          </a>
          <img className="logo" src="/images/ADURO_Logo Horizontal.png" />
          <h2>Calendar Builder</h2>
        </div>

        <div className="select-client">
          <div className="form-group">
            <label htmlFor="selectClient">Select Client</label>
            <select className="form-control" id="selectClient">
              <option>Client</option>
              <option>Client2</option>
            </select>
          </div>
        </div>

        <div className="get-started">
          <img className="folder" src="/images/icon_open_folder.svg" />
          <h2>Select a Client above to get started</h2>
        </div>

      </div>
    );
  }
}

export default App;
