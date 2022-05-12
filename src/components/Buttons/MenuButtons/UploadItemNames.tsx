import React, {useContext} from 'react';
import uploadIcon from "../../../img/icon-send.svg";
import { GlobalContext } from "../../../context/GlobalState";
import { convertTextData } from "../../../helpers/dataConverter";

const UploadItemNames = () => {
    const  { addItemNames } = useContext(GlobalContext) as any;
    let fileReader: FileReader;
    
    const handleFileRead = () => {
        const itemNames = convertTextData(fileReader.result, "item")
        
        addItemNames(itemNames) 
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
                <p className="MenuButton__text">Item Names</p>
            </label>
            
        </>
    );
};

export default UploadItemNames;
