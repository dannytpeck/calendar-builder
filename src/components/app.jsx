import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchClients } from '../actions/index';
import ClientList from './client_list';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };

    this.props.fetchClients();

    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  handleKeyUp(e) {
    if (e.target.value) {
      this.setState({ open: true });
    } else {
      this.setState({ open: false });
    }
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

        <div className="dropdown">

          <div className="client-search input-group">
            <input onKeyUp={this.handleKeyUp} type="text" className="form-control" placeholder="Client" />
            <span className="oi oi-magnifying-glass"></span>
          </div>

          <ClientList open={this.state.open} />
        </div>

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
