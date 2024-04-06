import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../util/Spotify';

function App() {
  const demo = [
    { name: 'Sample Song', artists: 'Anonymous Andy', album: 'Another Album', id: 0 },
    { name: 'Rough Riffs', artists: 'Dwayne the Twang Johnson', album: 'Rock n Rock', id: 1 },
    { name: 'Many Musics', artists: 'Legit Larry', album: 'Money Me', id: 2 }
  ]
  const [searchResults, setSearchResults] = useState();
  const [playlistName, setPlaylistName] = useState();
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const userPlaylist = [];

  useEffect(() => {
    Spotify.getAccessToken();
  }, []);

  function addTrack(track) {
    if (!playlistTracks.includes(track)) {
      setPlaylistTracks(p => [...p, track]);
    } else {
      console.log('Failed to update playlist.');
    }
  }

  function reset() {
    setSearchResults(() => []);
    document.getElementById("playlist-name").value = "";
    setPlaylistTracks(() => []);
  }

  function removeTrack(track) {
    if (playlistTracks.includes(track)) {
      const removeId = playlistTracks.indexOf(track);
      setPlaylistTracks(playlistTracks.filter((t) => t !== track));
    } else {
      console.log('Failed to update playlist.');
    }
  }

  function updatePlaylistName(name = "Loading...") {
    setPlaylistName(name);
  }

  async function savePlaylist() {
    const trackURIs = playlistTracks.map(track => track.id);
    console.log(`Saving ${playlistName} to Spotify.`);
    await Spotify.savePlaylist(playlistName, trackURIs);
    reset();
  }

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
