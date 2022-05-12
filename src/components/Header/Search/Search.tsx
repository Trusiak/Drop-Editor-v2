import React from 'react';
import searchIcon from '../../../img/icon-search.svg'
import './Search.scss';


const Search = () => {
    return (
        <div className="Search">
            <img className="Search__icon" alt="serach icon" src={searchIcon}/>
            <input className="Search__input" placeholder="Szukaj..."id="Search"/>
        </div>
      
    );
};

export default Search;
