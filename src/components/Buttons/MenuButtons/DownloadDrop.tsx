import React, {useContext} from 'react';
import downloadIcon from "../../../img/icon-download.svg";
import { GlobalContext } from "../../../context/GlobalState";
import jsonToMobDropConverter from '../../../helpers/jsonToMobDropConverter';
import { Drop } from '../../../types/interfaces/Drop';

const DownloadDrop = () => {
    const  { /* dropList */ dropListCopy } = useContext(GlobalContext);
   /*  const dropToJSON = JSON.stringify(dropList, null, 2); */
    
    const handleClick = () => {
        //saveDropToLocalStorage();
        viewDropInNewTab();
    }

    const viewDropInNewTab = () => {
       /*  const tempKeys = Object.keys(sessionStorage)
        let tempDrop: any = [];
        
        tempKeys.forEach(mob => {
            let tempElement:any = sessionStorage.getItem(mob);
            tempElement = JSON.parse(tempElement)
            tempDrop.push({mob: Number(mob), tempElement})
        })

        const finalDropList = dropList.map((drop:Drop)=>{
            let dropElement = tempDrop.find((el:any) => el.mob == drop.mob)
            if(dropElement !==undefined){
                drop.items = dropElement.tempElement
            }
            return drop
        }) */

         let dropListInSession: any = sessionStorage.getItem("drop") as any
         let dropList = JSON.parse(dropListInSession)
                            .sort((a:Drop, b:Drop)=>a.mob-b.mob) 
         
         setTimeout(() => {
            jsonToMobDropConverter(dropList);
         }, 300);
    }

/*     const saveDropToLocalStorage = () => {
        localStorage.setItem("drop", dropToJSON);
    } */
    return (
        <>
            <button onClick={handleClick} className="MenuButton">
                <img src={downloadIcon} alt="download icon"/>
                <p className="MenuButton__text">Drop</p>
            </button>
            
        </>
    );
};

export default DownloadDrop;
