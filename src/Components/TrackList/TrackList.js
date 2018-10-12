import React from 'react';
import Track from '../Track/Track.js';
import './TrackList.css';

class TrackList extends React.Component {
/*  Tracks passed here from SearchResults and Playlist
    For each track in the array this.props.tracks, render Track */
  render() {
    return (
      <div className="TrackList">
      {this.props.tracks.map(track => {
        return <Track     track={track}
                          key={track.id}
                          onAdd={this.props.onAdd}
                          onRemove={this.props.onRemove}
                          isRemoval={this.props.isRemoval} />
      })};
      </div>
  )}
};

export default TrackList;
