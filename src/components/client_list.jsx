import React, { Component } from 'react';
import { connect } from 'react-redux';

class ClientList extends Component {
  constructor(props) {
    super(props);
  }

  renderClient(client) {
    const name = client.name;
    return (
      <a className="dropdown-item" href="#" key={name}>{name}</a>
    );
  }

  render() {
    return (
      <div className={'client-list dropdown-menu ' + (this.props.open ? 'show' : '')} aria-labelledby="dropdownMenuButton">
        {this.props.clients.map(this.renderClient)}
      </div>
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
