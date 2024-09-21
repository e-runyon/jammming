import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../util/Spotify';

function App() {
  const [searchResults, setSearchResults] = useState(null);
  const [playlistName, setPlaylistName] = useState(null);
  const [playlistTracks, setPlaylistTracks] = useState([]);

  // Attempt to log in to Spotify when the user visits the URL.
  useEffect(() => {
    Spotify.getAccessToken();
  }, []);

  // Add track to the playlist creator
  function addTrack(track) {
    if (!playlistTracks.includes(track)) {
      setPlaylistTracks(p => [...p, track]);
    } else {
      console.log('Failed to update playlist.');
    }
  }

  // Resets search results and playlist
  function reset() {
    setSearchResults(() => []);
    document.getElementById("playlist-name").value = "";
    setPlaylistTracks(() => []);
  }

  // Remove track from the playlist creator
  function removeTrack(track) {
    if (playlistTracks.includes(track)) {
      const removeId = playlistTracks.indexOf(track);
      setPlaylistTracks(playlistTracks.filter((t) => t !== track));
    } else {
      console.log('Failed to update playlist.');
    }
  }

  // Update playlist name
  function updatePlaylistName(name = "Loading...") {
    setPlaylistName(name);
  }

  // Saves present playlist to User's Spotify account
  async function savePlaylist() {
    const trackURIs = playlistTracks.map(track => track.id);
    console.log(`Saving ${playlistName} to Spotify.`);
    await Spotify.savePlaylist(playlistName, trackURIs);
    reset();
  }

  // Searches for songs in Spotify's database
  async function search(term) {
    await Spotify.search(term).then(results => {
        setSearchResults(results)
      })
      .catch(error => console.error(`Search failed: ${error}`))
  }

  return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar onSearch={search} />
        <div className="App-playlist">
          <SearchResults
            searchResults={searchResults}
            onAdd={addTrack} />
          <Playlist
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            onRemove={removeTrack}
            onNameChange={updatePlaylistName}
            onSave={savePlaylist} />
        </div>
      </div>
    </div>
  );
}

export default App;
