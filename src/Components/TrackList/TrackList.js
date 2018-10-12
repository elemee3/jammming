import React from 'react';
import Track from '../Track/Track.js';
import './TrackList.css';

class TrackList extends React.Component {
  render() {
    console.log(`TRACKLIST RENDER: ${this.props.tracks}`);
    let { tracks } = this.props.tracks
    return (
      <div className="TrackList">
        {tracks.map(track => {
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
