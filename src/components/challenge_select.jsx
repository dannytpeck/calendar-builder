import React, { Component } from 'react';

class ChallengeSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      searchText: ''
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

  selectChallenge(client) {
    // const name = client.fields['Account Name'];
    // this.props.selectClient(client);
    // this.setState({ open: false, searchText: name });
  }

  render() {
    // const filteredClients = this.props.clients.filter(client => {
    // const name = client.fields['Account Name'].toLowerCase();
    // const searchText = this.state.searchText.toLowerCase();
    // return name.includes(searchText);
    // });

    return (
      <div className="challenge-select">
        <h5>Select Challenge</h5>
        <div className="dropdown">
          <div className="challenge-search input-group">
            <input value={this.state.searchText} onChange={this.handleChange} type="text" className="form-control" placeholder="Challenge" />
            <span className="oi oi-magnifying-glass"></span>
          </div>

          <div className={'challenge-list dropdown-menu ' + (this.state.open ? 'show' : '')}>
            {/* {filteredClients.length ? filteredClients.map(client => this.renderClient(client)) : ''} */}
          </div>
        </div>
      </div>
    );
  }
}

export default ChallengeSelect;
