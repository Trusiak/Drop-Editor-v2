import React from 'react';
import logo from '../../img/logo.png'
import Menu from "./Menu/Menu";
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header className="Header">
            <div className="wrapper">
            <Link to={`/`}>
                <img className="Header__logo" src={logo} alt="Zeyron logo"></img>
            </Link>
            <Menu/>
            </div>
        </header>
    );
};

export default Header;