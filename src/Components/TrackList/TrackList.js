import React from 'react';
import Track from '../Track/Track.js';
import './TrackList.css';

class TrackList extends React.Component {
  render() {
    console.log(`TRACKLIST RENDER: ${this.props.tracks}`);    //returning [object Promise]
// getting an error, because this.props.tracks is not an array, map only works for arrays
    let tracks = this.props.tracks.map(track => {
        return <Track     track={track}
                          key={track.id}
                          onAdd={this.props.onAdd}
                          onRemove={this.props.onRemove}
                          isRemoval={this.props.isRemoval} />
    })

    return (
      <div className="TrackList">
        {tracks}
      </div>
  )}
};

export default TrackList;
