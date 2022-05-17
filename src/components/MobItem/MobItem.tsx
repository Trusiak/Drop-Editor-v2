import React, {useContext, useState, useEffect, useRef, useLayoutEffect} from 'react';
import deleteIcon from "../../img/icon-delete.svg"
import editIcon from "../../img/icon-edit.svg"
import { ItemInMob } from '../../types/interfaces/ItemInMob';
import { GlobalContext } from "../../context/GlobalState";
import { Link } from 'react-router-dom'
import { removeElementAnimation, createListElementAnimation } from "../../helpers/animations";
import { useItemName } from "../../helpers/useItemName";
import MobItemIcon from "./MobItemIcon/MobItemIcon";
import MobItemContentEdit from "../../components/MobItem/EditMobItem/EditMobItem";

interface MobItemProps {
    item: ItemInMob,
    mob: number
}
const MobItem: React.FC<MobItemProps> = React.memo(({item, mob}) => {

    const {deleteItem } = useContext(GlobalContext) as any;
    const [edit, setEdit] = useState(false);
    const itemName = useItemName(item.id);
    const mobItem = useRef(null);

    const handleDeleteItem = () => {
        removeElementAnimation(mobItem.current, ()=> deleteItem({
            id: item.id,
            amount: item.amount,
            chance: item.chance,
        } as ItemInMob, mob))
    }

    const handleEdit = () => {
        setEdit((toggle) => !toggle)
    }
    
    useLayoutEffect(()=>{
        createListElementAnimation(mobItem.current);
    }, [])
    
    return (
        <li ref={mobItem} className="MobItem">
            <Link className="MobItem__content" to={`/items/${item.id}`}>
                <div className="MobItem__icon-wrapper">
                    <MobItemIcon itemName={itemName} itemId={item.id} />
                </div>
                <h4 className="MobItem__name">{itemName}</h4> 
            </Link>
                { edit ? (
                    <MobItemContentEdit stopEditing={()=>handleEdit()} edit={edit} mob={mob} item={item}/>
                        ):(
                    <MobItemContent item={item}/>   
                )}
            
            <div className="MobItem__button-wrapper">
                <button onClick={()=>handleEdit()} className="MobItem__button MobItem__button--edit">
                    <img className="MobItem__button-icon" src={editIcon} alt="ikona edycji"/>
                </button>
                <button onClick={handleDeleteItem} className="MobItem__button MobItem__button--delete">
                    <img className="MobItem__button-icon MobItem__button-icon--delete" src={deleteIcon} alt="ikona usuwania"/>
                </button>
            </div>
        </li>
    );
});

/* interface MobItemContentEditProps {
    item: ItemInMob,
    stopEditing: ()=> void,
    mob: number,
    edit: boolean
}

const MobItemContentEdit: React.FC<MobItemContentEditProps> = ({edit, item, stopEditing, mob}) => {

    const { editItem } = useContext(GlobalContext) as any;
    const inputRef = useRef(null!) as React.MutableRefObject<HTMLInputElement>;;
    const [amountInputValue, setAmountInputValue] = useState(item.amount);
    const [chanceInputValue, setChanceInputValue] = useState(item.chance);

    useEffect(() => {
        if (edit)
          inputRef.current.focus();
      }, [edit]);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        stopEditing();
        editItem({
            id: item.id,
            amount: Number(amountInputValue),
            chance: Number(chanceInputValue)
        }, item, mob)
    }

    const handleInputChange = (e: any) => {
        switch(e.target.name){
           case "amount": setAmountInputValue(e.target.value); break;
           case "chance": setChanceInputValue(e.target.value); break;
           default: break;
        }
    }

    return (
        <form className="MobItem__form" autoComplete="off" onSubmit={handleSubmit}>
            <input 
                value={amountInputValue} 
                onChange={handleInputChange}
                className="MobItem__input MobItem__input--amount"
                type="number" 
                name="amount"
                min="0"
                required
                ref={inputRef} 
            /> 
            <input 
                value={chanceInputValue} 
                onChange={handleInputChange}
                className="MobItem__input MobItem__input--chance"
                required
                step="0.01"
                min="0"
                max="100" 
                type="number"
                name="chance"/> 
            <button className="MobItem__button--finish-edit" type="submit">OK</button>
        </form>
    );
}; */

const MobItemContent = ({item} : any) => {
    return (
        <div className="MobItem__stats">
            <p className="MobItem__amount">{item.amount}x</p> 
            <p className="MobItem__chance">{item.chance}%</p>
        </div>
    );
};



export default MobItem;