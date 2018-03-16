import React, { Component } from 'react';

class ChallengeSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      searchText: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.addChallenge = this.addChallenge.bind(this);
  }

  handleChange(e) {
    if (e.target.value) {
      this.setState({ open: true, searchText: e.target.value });
    } else {
      this.setState({ open: false, searchText: '' });
    }
  }

  selectChallenge(challenge) {
    const title = challenge.title;
    this.props.selectChallenge(challenge);
    this.setState({ open: false, searchText: title });
  }

  addChallenge() {
    const challenge = this.props.selectedChallenge;

    if (challenge) {
      console.log('Added ' + challenge.title + '!');
    } else {
      console.log('No challenge selected!');
    }

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
        onClick={() => this.selectChallenge(challenge)}>
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
            <input value={this.state.searchText} onChange={this.handleChange} type="text" className="challenge-search-box form-control" placeholder="Add Challenge" />
            <span className="oi oi-magnifying-glass"></span>
          </div>

          <div className={'challenge-list dropdown-menu ' + (this.state.open ? 'show' : '')}>
            {filteredChallenges.length ? filteredChallenges.map(challenge => this.renderChallenge(challenge)) : ''}
          </div>
        </div>
        <img className="add-challenge-icon" src="images/icon_add.svg" onClick={this.addChallenge} />
      </div>
    );
  }
}

export default ChallengeSelect;
