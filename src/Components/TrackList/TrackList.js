import React from 'react';
import './TrackList.css';

function TrackList(props) {
    const list = props.list;
    return (
        <div className='TrackList'>
            {list.map((track) => 
            // <Track onAdd={props.onAdd} onRemove={props.onRemove} isRemoval={props.isRemoval}/>
            <div key={track.id}>
                <div>{track.name}</div>
                <div>{track.artist} | {track.album}</div>
            </div>)}
        </div>
    )
}

export default TrackList;