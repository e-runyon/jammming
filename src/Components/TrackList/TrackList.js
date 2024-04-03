import React from 'react';
import Track from '../Track/Track';
import './TrackList.css';

function TrackList(props) {
    const list = props.list;
    return (
        <div className='TrackList'>
            {list.map(track => (
                <Track track={track} isRemoval={props.isRemoval} onAdd={props.onAdd} onRemove={props.onRemove}/>
            ))
            }
        </div>
    )
}

export default TrackList;