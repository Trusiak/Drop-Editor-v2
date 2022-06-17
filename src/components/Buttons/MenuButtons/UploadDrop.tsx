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

// @ts-ignore
/* const convertMobDroptoJSON = (mobDrop: any) => {
    const tempResult: any = [];
    let actualMob = 0;
    
    mobDrop
            .split('\n\t')
            .filter(el => el.includes('Mob') || el.includes('item'))
            .map(el => {
                if(el.includes('Mob')){
                    actualMob = el.slice(4);
                }
                if(el.includes('item')){
                    let itemTab = el.split('\t')
                    tempResult.push({mob: parseInt(actualMob), item: {id: parseInt(itemTab[1]), amount: parseInt(itemTab[2]), chance: parseFloat(itemTab[3])}})
                }
            })

    const finalResult = tempResult
                        .reduce((p,n)=>{
                            try{
                                if(p[p.length-1].mob === n.mob)
                                    p[p.length-1].items.push(n.item);
                                else
                                    p.push({mob: n.mob, items:[n.item], level: {min: 1, max: 99}, gold: {min: 1, max: 99, chance: 10}})
                            }catch(e){
                                p.push({mob: n.mob, items:[n.item], level: {min: 1, max: 99}, gold: {min: 1, max: 99, chance: 10}})
                            }
                            
                            return p
                        }, [])
    return finalResult;
                        
} */

export default UploadDrop;
