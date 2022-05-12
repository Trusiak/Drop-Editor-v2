import React, { useEffect, useState } from 'react';
import * as Scroll from 'react-scroll';
import { ReactComponent as ScrollTopIcon } from "../../../img/icon-arrow-up.svg"
import { useScroll } from "../../../helpers/useScroll";

const ScrollTopButton = () => {
    let scroll  = Scroll.animateScroll;
    const scrollDirection = useScroll();
    const [scrolledUp, setScrolledUp] = useState(true);

    const handleClick = () => {
        scroll.scrollToTop();
    }

    useEffect(()=>{
        setScrolledUp(state => !state)
    }, [scrollDirection.direction])

    return (
        <button onClick={handleClick} className={`ScrollTopButton ${scrolledUp ? "ScrollTopButton--hide" : ""}`}>
                <ScrollTopIcon/>
        </button>
    );
};

export default ScrollTopButton;
