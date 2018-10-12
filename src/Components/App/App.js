import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';
import Spotify from '../../util/Spotify.js';

class App extends React.Component {
  constructor(props) {
    super(props);
/* Set initial states of searchResults, playlistName, and playlistTracks */
    this.state = {
      searchResults: []
    };
    this.state = {
      playlistName: 'New Playlist'
    };
    this.state = {
      playlistTracks: []
    };
/* Bind this to addTrack, removeTrack, updatePlaylistName, savePlaylist, and search */
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }
/* If the track isn't already in the playlist, add to end and set new state */
  addTrack(track) {
    for (let i = 0; i < this.state.playlistTracks.length - 1; i++) {
      if (track.id === this.state.playlistTracks[i].id) {
        return;
      } else {
        this.setState({
          playlistTracks: this.state.playlistTracks.push(track)
        });
      }
    }
    return this.state.playlistTracks;
  }
/* Remove the track from playlistTracks, set new state without it */
  removeTrack(track) {
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
  updatePlaylistName(name) {
    this.setState({ playlistName: name });
    return this.state.playlistName;
  }
/*  Generate an array of uri values from playlistTracks, send to Spotify account,
    reset playlistName and playlistTracks */
  savePlaylist() {
    let trackURIs = [];
    for (let i = 0; i < this.state.playlistTracks.length - 1; i++) {
      trackURIs.push(this.state.playlistTracks[i].uri);
    };
    Spotify.savePlaylist(this.state.playlistName, trackURIs);
    this.setState({ playlistName: 'New Playlist' });
    this.setState({ searchResults: [] });
  }
/*  Search the term in Spotify, update state of searchResults to
    returned promise from Spotify.search() */
  search(term) {
    this.setState({ searchResults: Spotify.search(term) })
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
        <SearchBar onSearch={this.search} />
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
    </div>
  )}
};

export default App;
