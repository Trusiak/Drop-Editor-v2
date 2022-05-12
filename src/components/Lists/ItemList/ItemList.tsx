import React, {useContext, useLayoutEffect, useRef} from 'react';
import { GlobalContext }  from "../../../context/GlobalState";
import ItemMob from "./Item/ItemMob"
import { convertItemId } from "../../../helpers/itemIdConverter";
import { createListAnimation } from "../../../helpers/animations";
import { MobInItem } from "../../../types/interfaces/MobInItem";
import { ItemInMob } from "../../../types/interfaces/ItemInMob";
import { ItemName } from "../../../types/interfaces/ItemName";

interface ItemListProps {
    match: {params: {id: string}}
}

const ItemList: React.FC<ItemListProps> = ({match}) => {

    const {itemNames, dropList } = useContext(GlobalContext);
    const itemID = parseInt(match.params.id);
    const itemList = useRef(null);

    const mobList = dropList.reduce((p,n)=>{
        let items = n.items.filter((item: ItemInMob) => item.id === itemID)
        if(items.length > 0){
            items.forEach((item: ItemInMob) => p.push(
                {
                    id: n.mob, 
                    count: item.count,
                    chance: item.chance
                }));
        }
               
        return p
    },[])

    const getItemName = (value: number) => {
        return itemNames.find((item: ItemName) => item.value === value).label
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
                    <img className="ItemList__image" src={`https://m2icondb.com/img/${convertItemId(itemID, getItemName(itemID))}.png`} alt="ikona itemu" /* src={`${itemID}.png`} */></img>
                </div>
                <h2 className="ItemList__title">{getItemName(itemID)} </h2>
            </header>
            <ul className="ItemList__list">
                {renderMobs}
            </ul>
        </section>
    );
};

export default ItemList;
