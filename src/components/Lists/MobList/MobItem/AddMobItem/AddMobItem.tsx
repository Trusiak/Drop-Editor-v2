import React, {useState, useContext, useRef, useEffect} from 'react';
import { GlobalContext } from '../../../../../context/GlobalState';
import ReactSelect from "../../../../Select/ReactSelect"
import { ItemInMob } from '../../../../../types/interfaces/ItemInMob';
import { createElementAnimation } from "../../../../../helpers/animations"

interface AddMobItemProps {
    isAddingNewItem: boolean,
    handleAddItem: ()=>void,
    mobId: number
}
 const AddMobItem: React.FC<AddMobItemProps> = ({isAddingNewItem, handleAddItem, mobId}) => {

    const  { itemNames, addItem } = useContext(GlobalContext) as any;
    const [chosenItem, setChosenItem] = useState({value: 0, label: "x"});
    const [chosenItemAmount, setChosenItemAmount] = useState('');
    const [chosenItemChance, setChosenItemChance] = useState('');
    const addItemForm = useRef(null);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if(chosenItem.value === 0)
            return

        addItem({
            id: chosenItem.value,
            amount: parseInt(chosenItemAmount),
            chance: parseFloat(chosenItemChance)
        }, mobId)

        setChosenItemAmount('')
        setChosenItemChance('')
        setChosenItem({value: 0, label: "x"})
        handleAddItem();
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
                />
                <input 
                    value={chosenItemAmount}
                    onChange={handleChange}
                    required
                    placeholder="Ilość" 
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
