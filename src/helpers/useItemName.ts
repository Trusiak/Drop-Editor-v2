import { useContext } from 'react';
import { removeIdFromName } from "./idRemover";
import { ItemName } from '../types/interfaces/ItemName';
import { GlobalContext } from "../context/GlobalState"

export const useItemName = (value: number) => {

    const { itemNames } = useContext(GlobalContext) as any;

    let itemName;
     try{
         itemName = itemNames.find((item: ItemName) => item.value === value).label
     }
     catch (e) {
         return "Przedmiot Nieznany"
     } 
     
     return removeIdFromName(itemName)
 }
