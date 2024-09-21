import React from "react";
import './Track.css';

function Track(props) {
    const {track, isRemoval} = props;
    let buttonContent = isRemoval ? '-' : '+';

    function addTrack() {
        console.log(`Adding ${track.name} to playlist...`);
        props.onAdd(track);
    }

    function removeTrack() {
        console.log(`Removing ${track.name} from playlist...`);
        props.onRemove(track)
    }
    
    return (
        <div className='Track' >
            <div className='Track-information'>
                <h3>{track.name}</h3>
                <p>{track.artists} • {track.album}</p>
            </div>
            <button className='Track-action' onClick={isRemoval ? removeTrack : addTrack}>{buttonContent}</button>
        </div>
    )
}

export default Track;
