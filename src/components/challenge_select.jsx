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

  cleanTitle(title) {
    return title
      .replace('2017: ', '').replace('2018: ', '').replace(/&#8217;/g, '\'')
      .replace(/&#8211;/g, '–').replace(/&#038;/g, '&');
  }

  renderChallenge(challenge) {
    const slug = challenge.slug;
    const title = this.cleanTitle(challenge.title);

    return (
      <span className="dropdown-item" key={slug}
        onClick={() => this.selectChallenge(title)}>
        {title}
      </span>
    );
  }

  render() {
    const filteredChallenges = this.props.challenges.filter(challenge => {
      const title = this.cleanTitle(challenge.title.toLowerCase());
      const searchText = this.state.searchText.toLowerCase();
      return title.includes(searchText);
    });

    return (
      <div className="challenge-select">
        <div className="dropdown">
          <div className="challenge-search input-group">
            <input value={this.state.searchText} onChange={this.handleChange} type="text" className="form-control" placeholder="Challenge" />
            <span className="oi oi-magnifying-glass"></span>
          </div>

          <div className={'challenge-list dropdown-menu ' + (this.state.open ? 'show' : '')}>
            {filteredChallenges.length ? filteredChallenges.map(challenge => this.renderChallenge(challenge)) : ''}
          </div>
        </div>
      </div>
    );
  }
}

export default ChallengeSelect;