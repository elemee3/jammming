import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';
import Spotify from '../../util/Spotify.js';

class App extends React.Component {
  constructor(props) {
    super(props)
/* Set initial states of searchResults, playlistName, and playlistTracks */
    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: []
    }
  }
/* If the track isn't already in the playlist, add to end and set new state */
  addTrack = (track) => {
    let { playlistTracks } = this.state.playlistTracks;
    for (let i = 0; i < playlistTracks.length - 1; i++) {
      if (track.id === playlistTracks[i].id) {
        return;
      } else {
        this.setState({
          playlistTracks: playlistTracks.push(track)
        });
      }
    }
    return this.state.playlistTracks;
  }
/* Remove the track from playlistTracks, set new state without it */
  removeTrack = (track) => {
    let trackList = this.state.playlistTracks;
    let trackToRemoveIndex = function () {
      for (let i = 0; i < trackList.length - 1; i++) {
        if (track.id === trackList[i].id) {
          return i;
        }
      }
    };
    trackList.splice(trackToRemoveIndex, 1);
    this.setState({
      playlistTracks: trackList
    });
    return this.state.playlistTracks;
  }
/* Sets new playlist name */
  updatePlaylistName = (name) => {
    this.setState({ playlistName: name });
    return this.state.playlistName;
  }
/*  Generate an array of uri values from playlistTracks, send to Spotify account,
    reset playlistName and playlistTracks */
  savePlaylist = () => {
    let trackURIs = [];
    for (let i = 0; i < this.state.playlistTracks.length - 1; i++) {
      trackURIs.push(this.state.playlistTracks[i].uri);
    };
    Spotify.savePlaylist(this.state.playlistName, trackURIs);
    this.setState({
      playlistName: 'New Playlist',
      searchResults: []
    });
  }
  // Search the term in Spotify, update state of searchResults to
  // returned promise from Spotify.search()
  search = (term) => {
    if (term) {
      this.setState({ searchResults: Spotify.search(term) })
    }
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
        <SearchBar tracks={this.state.playlistTracks} onSearch={this.search} />
        </div>
          <div className="App-playlist">
  {/*  Pass the state of App's searchResults to SearchResults component */}
          <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
  {/*  Pass the state of App's playlistName and playlistTracks to Playlist component */}
          <Playlist playlistName={this.state.playlistName}
                    playlistTracks={this.state.playlistTracks}
                    onRemove={this.removeTrack}
                    onNameChange={this.updatePlaylistName}
                    onSave={this.savePlaylist} />
          </div>
      </div>
    );
  }

};

export default App;
