import React from 'react';
import './SearchBar.css';

function SearchBar(props) {
    let term;
    function search(){
        props.onSearch(term);
    }

    function handleTermChange(event) {
        term = event.target.value;
    }

    return (
        <div className="SearchBar">
            <input placeholder="Enter A Song, Album, or Artist" onChange={handleTermChange} />
            <button className="SearchButton">SEARCH</button>
        </div>
    );
}

export default SearchBar;