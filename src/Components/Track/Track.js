import React from "react";
import './Track.css';

const Track = {
    renderAction() {
        const buttonContent = isRemoval ? '-' : '+';
        return (
            <div className='Track'>
                <div className='Track-information'>
                    <h3>Demo Track</h3>
                    <p>Demo Artist | Demo Album</p>
                </div>
                <button className='Track-action' onClick={this.addTrack}>{buttonContent}</button>
            </div>
        )
    },

    addTrack(props) {
        props.onAdd(this.track.id);
    },

    removeTrack(props){
        props.onRemove(this.track.id)
    }
}

export default Track;