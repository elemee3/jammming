import React from 'react';
import './SearchBar.css';
import TrackList from '../TrackList/TrackList.js';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }
/* Passes the state of term to onSearch in App, which passes to Spotify.search() */
  search = () => {
    this.props.onSearch(this.state.value);
  }
/* Sets state of SearchBar's term to input */
  handleTermChange = (event) => {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <div className="SearchBar">
        <input  type="text"
                value={this.state.value}
                placeholder="Enter A Song, Album, or Artist"
                onChange={this.handleTermChange} />
        <a onClick={this.search}>SEARCH</a>
        {console.log(`SearchBar calling TrackList:: `)}
        {console.log(this.props.tracks)}
        <TrackList tracks={this.props.tracks} />
      </div>
    )
  }
}

export default SearchBar;
