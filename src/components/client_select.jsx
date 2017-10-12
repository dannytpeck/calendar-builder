import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectClient } from '../actions/index';

class ClientSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      searchText: this.props.client.name || ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    if (e.target.value) {
      this.setState({ open: true, searchText: e.target.value });
    } else {
      this.setState({ open: false, searchText: '' });
    }
  }

  selectClient(client) {
    this.props.selectClient(client);
    this.setState({ open: false, searchText: client.name });
  }

  renderClient(client) {
    const name = client.name;
    return (
      <span className="dropdown-item" key={name}
        onClick={() => this.selectClient(client)}>
        {name}
      </span>
    );
  }

  render() {
    const filteredClients = this.props.clients.filter(client => {
      const name = client.name.toLowerCase();
      const searchText = this.state.searchText.toLowerCase();
      return name.includes(searchText);
    });

    return (
      <div className="client-select">
        <h5>Select Client</h5>
        <div className="dropdown">
          <div className="client-search input-group">
            <input value={this.state.searchText} onChange={this.handleChange} type="text" className="form-control" placeholder="Client" />
            <span className="oi oi-magnifying-glass"></span>
          </div>

          <div className={'client-list dropdown-menu ' + (this.state.open ? 'show' : '')}>
            {filteredClients.length ? filteredClients.map(client => this.renderClient(client)) : ''}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    clients: state.clients,
    client: state.selectedClient
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectClient }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientSelect);
