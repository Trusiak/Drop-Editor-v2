import React, { useContext, useRef, useEffect } from 'react';
import DownloadDrop from "../../Buttons/MenuButtons/DownloadDrop"
import Hamburger from '../../Buttons/MenuButtons/Hamburger';
import UploadDrop from '../../Buttons/MenuButtons/UploadDrop';
import UploadItemNames from '../../Buttons/MenuButtons/UploadItemNames';
import UploadMobNames from '../../Buttons/MenuButtons/UploadMobNames';
import {showMenu, hideMenu} from "../../../helpers/animations";
import  {GlobalContext} from '../../../context/GlobalState'

const Menu = () => {
    const { isHamburgerOpen } = useContext(GlobalContext);
    const menuList = useRef(null);

    useEffect(()=>{
        if(window.innerWidth <= 650){
            if(isHamburgerOpen)
                showMenu(menuList.current)
            else
                hideMenu(menuList.current)
        }
    },[isHamburgerOpen])
    
    return (
        <nav className="Menu">
            <ul ref={menuList} className="Menu__list">
                <div className="Menu__items-container">
                    <li className="Menu__item">
                        <UploadDrop/>
                    </li>
                    <li className="Menu__item">
                        <UploadItemNames/>
                    </li>
                </div>
                <div className="Menu__items-container">
                    <li className="Menu__item">
                        <UploadMobNames/>
                    </li>
                    <li className="Menu__item">
                        <DownloadDrop/>
                    </li>
                </div>
            </ul>
            <Hamburger/>
        </nav>
    );
};

export default Menu;