import React, {useContext} from 'react';
import uploadIcon from "../../../img/icon-send.svg";
import { GlobalContext } from "../../../context/GlobalState";
import { convertTextData } from "../../../helpers/dataConverter";

const UploadMobNames = () => {
    const  { addMobNames } = useContext(GlobalContext) as any;
    let fileReader: FileReader;
    
    const handleFileRead = () => {
        const mobNames = convertTextData(fileReader.result, "item")
        addMobNames(mobNames) 
      };

    const handleFileChosen = (file: File) => {
        fileReader = new FileReader();
        fileReader.onloadend = handleFileRead;
        fileReader.readAsText(file);
      };

    return (
        <>
            <label className="MenuButton">
                <input type="file" accept=".txt" onChange={e => handleFileChosen(e.target.files![0])} className="MenuButton" id="file-selector" multiple/>
                <img src={uploadIcon} alt="download icon"/>
                <p className="MenuButton__text">Mob Names</p>
            </label>
            
        </>
    );
};

export default UploadMobNames;
