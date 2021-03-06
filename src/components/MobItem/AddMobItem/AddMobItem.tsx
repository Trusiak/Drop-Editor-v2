import React, {useState, useContext, useRef, useEffect} from 'react';
import { GlobalContext } from '../../../context/GlobalState';
import ReactSelect from "../../Select/ReactSelect"
import { createElementAnimation } from "../../../helpers/animations"
import { MobListContext } from '../../../context/MobList';

interface AddMobItemProps {
    isAddingNewItem: boolean,
    handleAddItem: ()=>void,
    mob: number
}
 const AddMobItem: React.FC<AddMobItemProps> = ({ handleAddItem, mob}) => {

    const  { itemNames, updateDeepDropCopy } = useContext(GlobalContext) as any;
    const  { addItem2, saveLocalDropToSessionStorage } = useContext(MobListContext) as any;
    const [chosenItem, setChosenItem] = useState({value: 0, label: "x"});
    const [chosenItemAmount, setChosenItemAmount] = useState('');
    const [chosenItemChance, setChosenItemChance] = useState('');
    const addItemForm = useRef(null);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if(chosenItem.value === 0)
            return

        addItem2({
            id: chosenItem.value,
            amount: parseInt(chosenItemAmount),
            chance: parseFloat(chosenItemChance)
        })

        saveLocalDropToSessionStorage(mob);
        setChosenItemAmount('')
        setChosenItemChance('')
        setChosenItem({value: 0, label: "x"})
        handleAddItem();
        updateDeepDropCopy(mob);
    }

    useEffect(()=>{
        createElementAnimation(addItemForm.current);
       /*  return () => {
            removeListAnimation(addItemForm.current)
        } */
    }, [])



    const handleChange = (e: any) => {
        switch(e.target.name){
            case "amount": setChosenItemAmount(e.target.value); break;
            case "chance": setChosenItemChance(e.target.value); break;
        }
    }

    return (
        <form ref={addItemForm} onSubmit={handleSubmit} autoComplete="off" className="AddMobItem">
            <div className="AddMobItem__input-wrapper">
                <ReactSelect 
                    defaultValue={chosenItem}
                    setChosenItem={setChosenItem} 
                    options={itemNames} 
                    portalTarget={document.body}
                    className={'MobListSelect'}
                    classPrefix={'MobListSelect'}
                    autoFocus={true}
                />
                <input 
                    value={chosenItemAmount}
                    onChange={handleChange}
                    required
                    placeholder="Ilo????" 
                    type="number" 
                    name="amount" 
                    min="1" 
                    className="AddMobItem__input AddMobItem__input--short"
                />
                <input 
                    value={chosenItemChance}
                    onChange={handleChange}
                    placeholder="Szansa" 
                    required
                    step="0.01"
                    min="0" 
                    max="100" 
                    type="number" 
                    name="chance" 
                    className="AddMobItem__input AddMobItem__input--short"
                />
            </div>
            <button type="submit" className="AddMobItem__button">Dodaj</button>
        </form>
    );
};

export default AddMobItem;
