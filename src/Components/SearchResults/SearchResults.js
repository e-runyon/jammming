import React from 'react';
import './SearchResults.css';
import TrackList from '../TrackList/TrackList';

function SearchResults(props) {
    console.log(`Search Result Component Rx'd: ${props}`);
    return (
        <div className="SearchResults">
            <TrackList list={props.searchResults} onAdd={props.onAdd} isRemoval={false}/>
        </div>
    );
}

export default SearchResults;