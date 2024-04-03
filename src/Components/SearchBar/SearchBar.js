import React from 'react';
import './SearchBar.css';

function SearchBar(props) {
    let term;
    function search(){
        props.onSearch(term);
        document.getElementById('input').value = '';
    }

    function handleTermChange(event) {
        term = event.target.value;
    }

    return (
        <div className="SearchBar">
            <input placeholder="Enter A Song, Album, or Artist" onChange={handleTermChange} id="input"/>
            <button className="SearchButton" onClick={search}>SEARCH</button>
        </div>
    );
}

export default SearchBar;