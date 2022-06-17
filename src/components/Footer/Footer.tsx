import React from 'react';
import { Link } from 'react-router-dom'
import logo from '../../img/logo.png'

const Footer = () => {
    return (
        <footer className="Footer">
            <Link to={`/mobs/`}>
                <img className="Footer__logo" src={logo} alt="Zeyron logo"></img>
            </Link>
            <nav className="Footer_nav">
                <ul className="Footer__list">
                    <li className="Footer__item">Jak używać?</li>
                    <li className="Footer__item">Changelog</li>
                    <li className="Footer__item">Github</li>
                </ul>
            </nav>
            <p className="Footer__rights">All rights reserved @ 2021 Trusiak</p>
        </footer>
    );
};

export default Footer;