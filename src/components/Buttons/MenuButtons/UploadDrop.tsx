// @ts-nocheck
import React, {useContext} from 'react';
import uploadIcon from "../../../img/icon-send.svg";
import { GlobalContext } from "../../../context/GlobalState";
import { convertMobDroptoJSON } from "../../../helpers/mobDropToJsonConverter";
import { separateMobDrop } from '../../../helpers/separateMobDrop';

const UploadDrop = () => {
    const  { addDrop } = useContext(GlobalContext) as any;
    let fileReader: FileReader;
    
    const handleFileRead = () => {
        const content = convertMobDroptoJSON(fileReader.result)
        addDrop(content)
        //separateMobDrop(content)
      };

    const handleFileChosen = (file: File) => {
        fileReader = new FileReader();
        fileReader.onloadend = handleFileRead;
        fileReader.readAsText(file);
      };

    return (
        <>
            <label className="MenuButton">
                <input type="file" accept=".json, .txt" onChange={e => handleFileChosen(e.target.files![0])} className="MenuButton" id="file-selector" multiple/>
                <img src={uploadIcon} alt="download icon"/>
                <p className="MenuButton__text">Drop</p>
            </label>
            
        </>
    );
};


export default UploadDrop;
