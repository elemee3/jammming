import React from 'react';
import TrackList from '../TrackList/TrackList.js';
import './Playlist.css';

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
  }
/* triggered by onChange in input field, updates playlistName state */
  handleNameChange(event) {
    this.setState({ value: event.target.value.onNameChange });
  }

  render() {
    return (
      <div className="Playlist">
        <input  type="text"
                placeholder={'New Playlist'}
                value={this.state.value}
                onChange={this.handleNameChange} />
/*  playlistTracks passed here from App, passed down to TrackList */
/*     set isRemoval to true since tracks here are on the playlist already */
/* I know there is an issue here with the tracks property...Can't figure it out! */
//        <TrackList  tracks={this.props.playlistTracks}
//                    isRemoval={true}
//                    onRemove={this.props.onRemove} />
/*  Clicking link will call onSave in App, which calls Spotify.save() */
        <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
      </div>
    )
  }
}

export default Playlist;
