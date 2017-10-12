import React, { Component } from 'react';
import { connect } from 'react-redux';

class ClientName extends Component {
  render() {
    return (
      <h4 className="client-name my-5">{this.props.client.name}</h4>
    );
  }
}

function mapStateToProps(state) {
  return {
    client: state.selectedClient
  };
}

export default connect(mapStateToProps, null)(ClientName);
