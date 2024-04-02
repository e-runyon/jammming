import React from 'react';
import Track from '../Track/Track';
import './TrackList.css';

function TrackList(props) {
    const list = props.list;
    return (
        <div className='TrackList'>
            <Track isRemoval={true} id={props.id} />
        </div>
    )
}

export default TrackList;