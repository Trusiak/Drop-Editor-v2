import React, {useContext, useLayoutEffect, useRef} from 'react';
import { GlobalContext }  from "../../../context/GlobalState";
import ItemMob from "../../ItemMob/ItemMob"
import { createListAnimation } from "../../../helpers/animations";
import { MobInItem } from "../../../types/interfaces/MobInItem";
import { ItemInMob } from "../../../types/interfaces/ItemInMob";
import { useItemName } from "../../../helpers/useItemName";
import MobItemIcon from '../../MobItem/MobItemIcon/MobItemIcon';
import { Drop } from '../../../types/interfaces/Drop';
import { useDropFromSession } from '../../../helpers/useDropFromSession';

interface ItemListProps {
    match: {params: {id: string}}
}

const ItemList: React.FC<ItemListProps> = ({match}) => {

    const { dropListCopy } = useContext(GlobalContext);
    const itemID = parseInt(match.params.id);
    const itemName = useItemName(itemID);
    const itemList = useRef(null);
    const dropFromLocalStorage:Drop = useDropFromSession();
    const mobList = dropFromLocalStorage ? prepareItemListData(dropFromLocalStorage) : prepareItemListData(dropListCopy);

    function prepareItemListData(drop: any){
        return drop.reduce((p: any,n: any)=>{
            let items = n.items.filter((item: ItemInMob) => item.id === itemID)
            if(items.length > 0){
                items.forEach((item: ItemInMob) => p.push(
                    {
                        id: n.mob, 
                        amount: item.amount,
                        chance: item.chance
                    }));
            }
            return p
        },[])
    }
    
    const renderMobs = mobList.map((mob: MobInItem, index: number) => {
        return <ItemMob mobData={mob} key={index}/>
    }) 

    useLayoutEffect(()=>{
        createListAnimation(itemList.current)
    }, [])

    return (
        <section ref={itemList} className="ItemList">
            <header className="ItemList__header">
                <div className="ItemList__image-container">
                    <MobItemIcon itemId={itemID} itemName={itemName}/>
                </div>
                <h2 className="ItemList__title">{itemName} <span className="ItemList__title--id">({itemID})</span> </h2>
            </header>
            <ul className="ItemList__list">
                {renderMobs}
            </ul>
        </section>
    );
};

export default ItemList;
