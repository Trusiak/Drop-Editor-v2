import React from 'react';
import expandIcon from "../../../../img/icon-expand.svg";

interface expandMobListProps {
    numberOfItems: number,
    handleToogleList: ()=>void
}

const ExpandMobList: React.FC<expandMobListProps> = ({numberOfItems, handleToogleList}) => {
    return (
        <div className="ExpandMobList" onClick={handleToogleList}>
            <img className="ExpandMobList__icon" src={expandIcon} alt="Ikona Pobierania"></img>
            <h3 className="ExpandMobList__name">Show {`(${numberOfItems} records)`} </h3>
        </div>
    );
}; 
 
export default ExpandMobList;