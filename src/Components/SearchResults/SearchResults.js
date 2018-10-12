import React from 'react';
import TrackList from '../TrackList/TrackList.js';
import './SearchResults.css';

class SearchResults extends React.Component {
  render() {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
{/*  SearchResults passed here from App gets passed to TrackList as tracks property,
    functionality for onAdd */}
        <TrackList tracks={this.props.searchResults} onAdd={this.props.onAdd} isRemoval={false} />
      </div>
    )
  }
}

export default SearchResults;
