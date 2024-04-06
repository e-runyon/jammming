import React from 'react';
import TrackList from '../TrackList/TrackList';
import './Playlist.css';

function Playlist(props) {
    function handleNameChange(event){
        props.onNameChange(event.target.value);
        
    }

    return (
        <div className='Playlist'>
            <input id='playlist-name' placeholder='New Playlist' onChange={handleNameChange}/>
            <TrackList list={props.playlistTracks} onRemove={props.onRemove} isRemoval={true}/>
            <button className='Playlist-save' onClick={props.onSave}>SAVE TO SPOTIFY</button>
        </div>
    );
}

export default Playlist;