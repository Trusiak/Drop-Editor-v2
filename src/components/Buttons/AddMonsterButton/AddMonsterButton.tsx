import React from 'react';
import downloadIcon from "../../../img/icon-add-button.svg";

const AddMonsterButton = () => {
    return (
        <button className="AddMonsterButton">
            <p className="AddMonsterButton__text">Dodaj</p>
            <img className="AddMonsterButton__icon" src={downloadIcon} alt="Ikona Pobierania"></img>
        </button>
    );
};

export default AddMonsterButton;