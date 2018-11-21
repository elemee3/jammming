const clientSecret = '0493228183a0469791f6eda5192ce5eb';
const clientId = '9719656dcd2c46e29578cc7cc42b49cf';
const redirectURI = 'http://localhost:3000/';
const request = require('request');
let accessToken;

let authOptions = {
  url: `https://accounts.spotify.com/api/token`,
  headers: {
    'Authorization': 'Basic ' + (new Buffer(clientId + ':' + clientSecret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

class Spotify {
  search(term) {
    let trackList;
    const url =  `https://api.spotify.com/v1/search?type=track&q=${term}`;
    request.post(authOptions, function(error, response, body) {
      if (error) {
        console.log(error)
      }
      console.log('response::::: ')
      console.log(JSON.stringify(body))
      if (!error && response.statusCode === 200) {
        // use the access token to access the Spotify Web API
        var token = body.access_token;
        var options = {
          url: `https://api.spotify.com/v1/search?type=track&q=${term}`,
          headers: {
            'Authorization': 'Bearer ' + token,
            'Access-Control-Allow-Origin': '*'
          },
          json: true
        };
        trackList = request.get(options, function(error, response, body) {
          console.log(body.tracks.items[0])
          return body.tracks
        });
      }
      console.log(trackList)
      return trackList
    });
  }
}
//
// let spot = new Spotify()
// spot.search('abba')

export default Spotify;

// jsonResponse.map(track => {
//   return {
//     id: track.id,
//     name: track.name,
//     artist: track.artists[0].name,
//     album: track.album.name,
//     uri: track.uri
//   }
// })

//////////////////////////////////////////////////////////////////////////////


// let Spotify = {
// /* Checks to make sure that the URL contains access_token and expires_in */
//   isUrl() {
//     if (window.location.href.match(/access_token=([^&]*)/) &&
//         window.location.href.match(/expires_in=([^&]*)/)) {
//           return true;
//         } else {
//           return false;
//         }
//   },
// /* Returns accessToken once it is saved, retrieves it if not */
//   getAccessToken() {
//     if (accessToken) {
//       return accessToken;
//     };
// /*  If the url is populated with access_token and expires_in, set those values to variables.
//     Set expiration time, then clear the values for access_token and expires_in. Finally,
//     redirect client to logged-in Spotify */
//     if (this.isUrl) {
//       let accessToken = window.location.href.match(/access_token=([^&]*)/);
//       let expiresIn = window.location.href.match(/expires_in=([^&]*)/);
//       window.setTimeout(() => accessToken = '', expiresIn * 1000);
//       window.history.pushState('Access Token', null, '/');
//       if (!accessToken) {
//         return;
//       } else {
//       window.location.assign(`https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`);
//       }
//     }
//   },
// /* Accept a search term, pass term value to a Spotify request, return list of tracks */
//   async search(term) {
//     const url =  `https://api.spotify.com/v1/search?type=track&q=${term}`;
//     await fetch(url, {
//       headers: {  Authorization: `Bearer ${accessToken}`  }
//     }).then(response => {
//     if (response.ok) {
//       return response.json();
//     }
//     throw new Error('Request failed!');
//   }, networkError =>
//     console.log(networkError.message)).then(jsonResponse => {
//       if (jsonResponse === []) {
//         return [];
//       }
//       jsonResponse.map(track => {
//         return {
//           id: track.id,
//           name: track.name,
//           artist: track.artists[0].name,
//           album: track.album.name,
//           uri: track.uri
//         }
//       })
//     })
//   },
//
//   async savePlaylist(playlistName, playlistTracks) {
//     // Make sure playlistName and playlistTracks both have a value
//     if (!playlistName || !playlistTracks) {
//       return;
//     }
//     // Set variables
//     let accessToken =  window.location.href.match(/access_token=([^&]*)/);
//     let headers = {
//       Authorization: `Bearer ${accessToken}`
//     };
//     let userId;
//     // Request and return user ID from Spotify (GET)
//     await fetch('https://api.spotify.com/v1/me', {
//       headers: headers
//     }).then(response => {
//       if (response.ok) {
//         return response.json();
//       }
//       throw new Error('Request failed!');
//     }, networkError =>
//     console.log(networkError.message)).then(jsonResponse => {
//       let userId = jsonResponse.id;
//       return userId;
//     })
//     // Create a new playlist in the user's account and return a playlist ID (POST)
//     await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
//         headers: headers,
//         method: 'POST',
//         body: JSON.stringify({
//           "name": playlistName
//         })
//     }).then(response => {
//       if (response.ok) {
//         return response.json();
//       }
//       throw new Error('Request failed!');
//     }, networkError =>
//     console.log(networkError.message)).then(jsonResponse => {
//       let playlistID = jsonResponse.id;
//       return playlistID;
//     })
//     // Write track URIs to the new playlist (POST)
//     await fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${this.playlistID}/tracks`, {
//       headers: headers,
//       method: 'POST',
//       body: JSON.stringify({
//         "uris": playlistTracks
//       })
//     }).then(response => {
//       if (response.ok) {
//         return response.json();
//       }
//       throw new Error('Request failed!');
//     }, networkError =>
//     console.log(networkError.message)).then(jsonResponse => {
//       let playlistID = jsonResponse.id;
//       return playlistID;
//     })
//   }
// };