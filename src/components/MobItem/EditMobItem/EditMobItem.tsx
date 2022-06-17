
import React, {useContext, useRef, useState, useEffect} from 'react';
import { ItemInMob } from "../../../types/interfaces/ItemInMob";
import { GlobalContext } from "../../../context/GlobalState";
import { MobListContext } from '../../../context/MobList';

interface MobItemContentEditProps {
    item: ItemInMob,
    stopEditing: ()=> void,
    mob: number,
    edit: boolean
}

const MobItemContentEdit: React.FC<MobItemContentEditProps> = ({edit, item, stopEditing, mob}) => {

    const { editItem2, saveLocalDropToSessionStorage } = useContext(MobListContext) as any;
    const { updateDeepDropCopy } = useContext(GlobalContext) as any;
    const inputRef = useRef(null!) as React.MutableRefObject<HTMLInputElement>;
    const [amountInputValue, setAmountInputValue] = useState(item.amount);
    const [chanceInputValue, setChanceInputValue] = useState(item.chance);

    useEffect(() => {
        if (edit)
          inputRef.current.focus();
      }, [edit]);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        stopEditing();

        editItem2({
            id: item.id,
            amount: Number(amountInputValue),
            chance: Number(chanceInputValue)
        }, item)

        saveLocalDropToSessionStorage(mob);
        updateDeepDropCopy(mob);
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
};

export default MobItemContentEdit;