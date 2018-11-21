import React from 'react';
import TrackList from '../TrackList/TrackList.js';
import './SearchResults.css';

class SearchResults extends React.Component {
  render() {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        {console.log('SearchResults calling TrackList::')}
        {console.log(this.props.searchResults)}
        <TrackList  tracks={this.props.searchResults}
                    onAdd={this.props.onAdd}
                    isRemoval={false}
        />
      </div>
    )
  }
}

export default SearchResults;
