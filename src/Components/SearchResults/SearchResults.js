import React from 'react';
import './SearchResults.css';
import TrackList from '../TrackList/TrackList';

function SearchResults(props) {
    return (
        <div className="SearchResults">
            <TrackList list={props.searchResults} onAdd={props.onAdd} isRemoval={false}/>
        </div>
    );
}

export default SearchResults;