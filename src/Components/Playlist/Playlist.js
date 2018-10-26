import React from 'react';
import TrackList from '../TrackList/TrackList.js';
import './Playlist.css';

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  //  this.onNameChange = this.onNameChange.bind(this);  not sure what this s/b doing?
  }
/* triggered by onChange in input field, updates playlistName state */
  handleNameChange = (event) => {
    this.setState({ value: event.target.value.onNameChange });
  }

  render() {
    return (
      <div className="Playlist">
        <input  type="text"
                placeholder={'New Playlist'}
                value={this.state.value}
                onChange={this.handleNameChange} />
        <TrackList tracks={this.props.playlistTracks}
                   isRemoval={true}
                   onRemove={this.props.onRemove} />
        {/* Click calls .onSave() in App, which calls Spotify.save() */}
        <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
      </div>
    )
  }
}

export default Playlist;
