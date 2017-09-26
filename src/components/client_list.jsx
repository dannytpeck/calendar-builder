import React, { Component } from 'react';
import { connect } from 'react-redux';

class ClientList extends Component {
  renderClient(client) {
    const name = client.name;
    return (
      <li key={name}>{name}</li>
    );
  }

  render() {
    return (
      <ul>
        {this.props.clients.map(this.renderClient)}
      </ul>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
    clients: state.clients
  };
}

export default connect(mapStateToProps)(ClientList);
