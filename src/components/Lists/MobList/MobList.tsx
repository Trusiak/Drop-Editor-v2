import React, {useState, useContext, useRef, useEffect, useMemo} from 'react';
import { ItemInMob } from '../../../types/interfaces/ItemInMob';
import { LevelDrop } from '../../../types/interfaces/LevelDrop';
import AddMobItem from "../../MobItem/AddMobItem/AddMobItem";
import addIcon from "../../../img/icon-add.svg";
import removeIcon from "../../../img/icon-remove.svg";
import MobItem from '../../MobItem/MobItem';
import { GlobalContext } from '../../../context/GlobalState';
import { createListAnimation, removeListAnimation } from "../../../helpers/animations"
import { useMobName } from "../../../helpers/useMobName";
import { MobListContext } from '../../../context/MobList';
import ExpandMobList from './ExpandMobList/ExpandMobList';
import { useLocation } from 'react-router-dom'


interface MobListProps {
    id: number,
    items: ItemInMob[],
    level: LevelDrop
    key: number,
    index: number
}


const MobList: React.FC<MobListProps> = ({id, items, level, index}) => {
    const [isAddingNewItem, setIsAddingNewItem] = useState(false);
    const location = useLocation(); 
    const [isOpened, setIsOpened] = useState(()=> index < 4 ? false : true)
    const { addLocalDrop, mobDropList } = useContext(MobListContext) as any;
    const { deleteMob, updateDeepDropCopy, mobNames } = useContext(GlobalContext) as any;
    const mobList = useRef(null);
    const mobName = useMobName(id)

    const handleToogleList = () => {
        setIsOpened(!isOpened)
    }

    const handleAddItem = () => {
        setIsAddingNewItem((isAddingNewItem)=> !isAddingNewItem);
    }

    const handleDeleteMob = () => {
        removeListAnimation(mobList.current, ()=> deleteMob(id))
        sessionStorage.removeItem(`${id}`);
        updateDeepDropCopy(id);
    }

    const checkIsLocactionHash = () =>{
        if(location.hash === `#${id}`){
            setTimeout(() => {
                handleToogleList();
            }, 350);
        }
    }

    const updateLocalContext = () => {
        let mobDrop: any = sessionStorage.getItem(`${id}`) 

        if(mobDrop === null)
            addLocalDrop(items)
        else
            addLocalDrop(JSON.parse(mobDrop))
    }

    const mobItems = useMemo(()=>{
        if(!isOpened){
            return mobDropList
                .map((item: any, index: any)=>
                {
                    const key = item.id + (index * item.id + mobDropList.length);
                    return <MobItem key={key} mob={id} item={item}/>
                })
        }
        else return <ExpandMobList numberOfItems={mobDropList.length} handleToogleList={handleToogleList}/>
        
    }, [isOpened, mobDropList.length, mobDropList])

    useEffect(()=>{
        createListAnimation(mobList.current);
        updateLocalContext(); 
        checkIsLocactionHash();
    }, [])

    return useMemo(()=> {
        return (
                <section ref={mobList} className="MobList" id={`${id}`}>
                    <header className="MobList__header">
                        <div className="MobList__image-container">
                            <img src={`/mobs/${id}.png`} onError={(e: any)=>{e.target.onerror = null; e.target.src="/images/unknown-monster.png"}} className="MobList__image" alt="moblist icon"/>
                        </div>
                        <div className="MobList__title-containter">
                            <h2 className="MobList__name">{mobName} ({id})</h2>
                            <p className="MobList__level">[{level.min} - {level.max}] Lvl</p>
                        </div>
                        <button onClick={handleAddItem} className="MobList__actionButton MobList__actionButton--add">
                            <img src={addIcon} className="MobList__addIcon" alt="moblist icon"/>
                        </button>
                        {/* {console.log("☆ MOBLISTA została wyrenderowana ☆", id)} */}
                        <button onClick={handleDeleteMob} className="MobList__actionButton MobList__actionButton--delete">
                            <img className="MobList__addIcon" src={removeIcon} alt="ikona usuwania"/>
                        </button>
                    </header>
                    { isAddingNewItem ? <AddMobItem handleAddItem={handleAddItem} isAddingNewItem={isAddingNewItem} mob={id}/> : null}
                    <ul className="MobList__list">
                        {mobItems}
                    </ul>
                </section>
    )
}, [mobDropList, isAddingNewItem, isOpened,mobNames]) 
}

export default MobList;