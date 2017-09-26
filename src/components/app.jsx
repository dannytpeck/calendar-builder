import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchClients } from '../actions/index';
import ClientList from './client_list';

class App extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.fetchClients();
  }

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
          <div className="form-group" onClick={this.handleClick}>
            <label htmlFor="selectClient">Select Client</label>
            <select className="form-control" id="selectClient">
              <option>Client</option>
              <option>Client2</option>
            </select>
          </div>
        </div>

        <ClientList />

        <div className="get-started">
          <img className="folder" src="/images/icon_open_folder.svg" />
          <h2>Select a Client above to get started</h2>
        </div>

      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchClients }, dispatch);
}

export default connect(null, mapDispatchToProps)(App);
