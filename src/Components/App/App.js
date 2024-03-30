import React, {useState} from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

function App() {
  function addTrack(track) {
    if (!playlistTracks.includes(track.id)){
      playlistTracks.push(track);
      setPlaylistTracks(playlistTracks);
    }
  }

  function removeTrack(track) {
    if (playlistTracks.includes(track.id)){
      playlistTracks.splice(playlistTracks.indexOf(track.id), 1);
      setPlaylistTracks(playlistTracks);
    }
  }

  function updatePlaylistName(name = "Loading...") {
    setPlaylistName(name);
    console.log(name);
  }

  function savePlaylist(){
    const trackURIs = playlistTracks.map(track => track.uri);
    console.log('Playlist Saved!')
  }

  function search(term){
    console.log(term);
  }

  const demo = [
    { name: 'Sample Song', artist: 'Anonymous Andy', album: 'Another Album', id: 0 },
    { name: 'Rough Riffs', artist: 'Dwayne the Twang Johnson', album: 'Rock n Rock', id: 1 },
    { name: 'Many Musics', artist: 'Legit Larry', album: 'Money Me', id: 2 }
  ]

  const userPlaylist = [];

  const [searchResults, setSearchResults] = useState(demo);
  const [playlistName, setPlaylistName] = useState('Demo');
  const [playlistTracks, setPlaylistTracks] = useState(demo);

  return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar onSearch={search}/>
        <div className="App-playlist">
          <SearchResults 
            searchResults={searchResults} 
            onAdd={addTrack}/>
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
