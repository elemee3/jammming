import React from 'react';
import './SearchBar.css';
import TrackList from '../TrackList/TrackList.js';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }
/* Passes the state of term to onSearch in App, which passes to Spotify.search() */
  search() {
    this.props.onSearch(this.state.value);
  }
/* Sets state of SearchBar's term to input */
  handleTermChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <div className="SearchBar">
        <input  type="text"
                value={this.state.value}
                placeholder="Enter A Song, Album, or Artist"
                onChange={this.handleTermChange} />
        <a>SEARCH</a>
        <TrackList tracks={this.state.searchResults} />
      </div>
    )
  }
}

export default SearchBar;
