import React, {useState, useContext, useRef, useEffect, useLayoutEffect} from 'react';
import { ItemInMob } from '../../../types/interfaces/ItemInMob';
import { LevelDrop } from '../../../types/interfaces/LevelDrop';
import { MobName } from '../../../types/interfaces/MobName';
import AddMobItem from "./MobItem/AddMobItem/AddMobItem";
import addIcon from "../../../img/icon-add.svg";
import removeIcon from "../../../img/icon-remove.svg";
import MobItem from './MobItem/MobItem';
import { GlobalContext } from '../../../context/GlobalState';
import { createListAnimation, removeListAnimation } from "../../../helpers/animations"

interface MobListProps {
    id: number,
    items: ItemInMob[],
    level: LevelDrop
}


const MobList: React.FC<MobListProps> = React.memo(({id, items, level}) => {

    const [isAddingNewItem, setIsAddingNewItem] = useState(false);
    const { mobNames, deleteMob } = useContext(GlobalContext) as any;
    const mobList = useRef(null);

    const mobItems = items
                        .filter(item => item.id)
                        .map((item, index)=>
                        {
                            const key = item.id + (index * item.id + items.length);
                            return <MobItem key={key} mob={id} item={item}/>
                        })
                        
    const handleAddItem = () => {
        setIsAddingNewItem((isAddingNewItem)=> !isAddingNewItem);
    }

    const getMobName = (value: number) => {
        let tempMobNames;
        try{
            tempMobNames = mobNames.find((mob: MobName) => mob.value === value).label
        }
        catch(e){
            return `Nieznany potwór (${value})`
        }
        return tempMobNames;
    }

    const handleDeleteMob = () => {
        removeListAnimation(mobList.current, ()=> deleteMob(id))
    }

    useLayoutEffect(()=>{
        createListAnimation(mobList.current)
    }, [])
        
    return (
            <section ref={mobList} className="MobList" id={`${id}`}>
                <header className="MobList__header">
                    <div className="MobList__image-container">
                        <img src={`/mobs/${id}.png`} onError={(e: any)=>{e.target.onerror = null; e.target.src="/images/unknown-monster.png"}} className="MobList__image" alt="moblist icon"/>
                    </div>
                    <div className="MobList__title-containter">
                        <h2 className="MobList__name">{getMobName(id)}</h2>
                        <p className="MobList__level">[{level.min} - {level.max}] Lvl</p>
                    </div>
                    <button onClick={handleAddItem} className="MobList__actionButton MobList__actionButton--add">
                        <img src={addIcon} className="MobList__addIcon" alt="moblist icon"/>
                    </button>
                    <button onClick={handleDeleteMob} className="MobList__actionButton MobList__actionButton--delete">
                        <img className="MobList__addIcon" src={removeIcon} alt="ikona usuwania"/>
                    </button>
                </header>
                { isAddingNewItem ? <AddMobItem handleAddItem={handleAddItem} isAddingNewItem={isAddingNewItem} mobId={id}/> : null}
                <ul className="MobList__list">
                    {mobItems}
                </ul>
            </section>
    );
}, (prevProps, nextProps) => { return (
prevProps.items.length === nextProps.items.length &&
prevProps.level.min === nextProps.level.min &&
prevProps.level.max === nextProps.level.max)})

export default MobList;
