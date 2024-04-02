import React from "react";
import './Track.css';

function Track(props) {
    function renderAction() {
        const buttonContent = props.isRemoval ? '-' : '+';
        return (
            <div className='Track'>
                <div className='Track-information'>
                    <h3>Demo Track</h3>
                    <p>Demo Artist | Demo Album</p>
                </div>
                <button className='Track-action' onClick={this.addTrack}>{buttonContent}</button>
            </div>
        )
    }

    function addTrack(props) {
        props.onAdd(this.track.id);
    }

    function removeTrack(props){
        props.onRemove(this.track.id)
    }
}

export default Track;