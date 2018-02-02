import React, { Component } from 'react';
import { connect } from 'react-redux';

class ClientName extends Component {
  render() {
    return (
      <h4 className="client-name my-5">{this.props.selectedClient.fields['Account Name']}</h4>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedClient: state.selectedClient
  };
}

export default connect(mapStateToProps, null)(ClientName);
